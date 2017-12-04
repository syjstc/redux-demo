import { forEachObj } from './utils'
import createReducer from './createReducer'

import {
  createAsyncAction,
  setActions,
  actionTypeCreator,
  parseAction,
  createActionCreator
} from './actionTool'

export const stateCreator = (envName, stateName, { initData, transformers, apis={}, useEntityStatus=false }) => {
  let createAsyncActionWithEntityStatus = null

  if (useEntityStatus) {
    createAsyncActionWithEntityStatus = require('./entityStatus/createAsyncActionWithEntityStatus').default
  }

  let actionTypes = [] // allowed actions which can be used by reducer
  let actionCreators = {} // used by dispatcher
  const getActionTypeName = (transformationName) => actionTypeCreator(envName, stateName, transformationName)

  const convertTransformerToActionCreator = (transformation, transformationName) => {
    /*
      three things for convertor
      1. generate action type
      2. generate action creator
      3. return these generated things
    */

    const requestFn = apis[transformationName]
    if (requestFn) { // for async action
      // step 1
      const asyncTypeNames = {}
      const types = ['request', 'success', 'failure']
      types.forEach(name => {
        asyncTypeNames[`${name}TypeName`] = getActionTypeName(`${transformationName}@${name}`)
      })

      // step 2
      const generateAsyncActionCreator = useEntityStatus ? createAsyncActionWithEntityStatus : createAsyncAction
      const actionCreator = generateAsyncActionCreator(envName, stateName, asyncTypeNames, transformationName, requestFn)


      // step 3
      if (useEntityStatus) {
        actionTypes.push(getActionTypeName(transformationName))
      } else {
        actionTypes = actionTypes.concat(Object.values(asyncTypeNames))
      }
      actionCreators[transformationName] =actionCreator
    } else { // for sync action
      // step 1
      const actionTypeName = getActionTypeName(transformationName)

      // step 2
      const actionCreator = createActionCreator(actionTypeName)

      // step 3
      actionTypes.push(actionTypeName)
      actionCreators[transformationName] = createActionCreator(actionTypeName)
    }
  }

  forEachObj(convertTransformerToActionCreator, transformers)
  setActions(stateName, actionCreators) // bind actions to global action storage

  const reducer = createReducer(actionTypes, transformers, initData)

  return {
    actionCreators,
    reducer,
  }
}

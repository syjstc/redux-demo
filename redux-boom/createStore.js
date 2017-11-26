import { createStore as createReduxStore, applyMiddleware } from 'redux'
import { combineImmutableReducers as combineReducers } from 'immutable-redux'
import { createLogger } from 'redux-logger'
import ReduxThunk from 'redux-thunk'
import Immutbale from 'immutable'

import { stateCreator } from './stateCreator'
import entityStatusState from './entityStatus/entityStatusState'
import { forEachObj } from './utils'

const logger = createLogger({
  collapsed: true,
  stateTransformer: state => {
    if (state.toJS && typeof state.toJS === 'function') {
      return state.toJS()
    }
    throw new TypeError(
      'state seems not a Immutbale object, use redux-logger instead',
    )
  },
})

let _store = {}

export const createStore = (appName, states, normalReducers={}, middlewares=[]) => {
  const reducers = {}

  forEachObj((state, stateName) => {
    reducers[stateName] = stateCreator(appName, stateName, state).reducer
  }, states)

  const entityStatusTransformedState = stateCreator(appName, 'entityStatus', entityStatusState)
  reducers.entityStatus = entityStatusTransformedState.reducer

  _store = createReduxStore( combineReducers(Object.assign(reducers, normalReducers)), applyMiddleware(...[ReduxThunk, logger, ...middlewares]) )
  return _store
}

export const setStore = (store) => _store = store

export const getStore = () => _store
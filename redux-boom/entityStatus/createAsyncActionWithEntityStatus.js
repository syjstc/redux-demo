import { getEntityStatusPath } from './entityStatusUtils'
import { actionTypeCreator } from '../actionTool'

const createAsyncActionWithEntityStatus = (envName, entityName, typeNames, transformationName, requestFn) => {
  const setEntityStatusTypeName = actionTypeCreator(envName, 'entityStatus', 'setStatus')
  const actionTypeName = actionTypeCreator(envName, entityName, transformationName)


  return (options) => {
    const entityStatusPath = getEntityStatusPath(entityName, options)
    return (dispatch) => {
      dispatch({
        type: setEntityStatusTypeName,
        payload: {
          path: entityStatusPath,
          status: {
            [transformationName]: true,
          },
        },
      })

      return requestFn(options).then((res) => {
        // update entityStatus
        const statusPayload = {
          path: entityStatusPath,
          status: {
            [transformationName]: false,
          },
        }

        if (res.list) { // fetch list
          if (res.ids) {
            statusPayload.status.ids = res.ids
          }
        } else { // add, delete, change item
          if (res.id) {
            statusPayload.status.ids = [res.id]
          }
        }

        dispatch({
          type: setEntityStatusTypeName,
          payload: statusPayload,
        })

        // update entity data
        dispatch({
          type: actionTypeName,
          payload: (res && res.list) ? res.list : res,
        })
      }).catch(() => {
        dispatch({
          type: setEntityStatusTypeName,
          payload: {
            path: entityStatusPath,
            status: {
              [transformationName]: true,
            },
          },
        })
      })
    }
  }
}

export default createAsyncActionWithEntityStatus

import Immutable from 'immutable'
import { getStore } from './createStore'
import { getEntityStatusPathByOptions, defaultVariation } from './utils'
import { getEntityStatusPath } from './entityStatus/entityStatusUtils'

const EMPTY_IMMUTABLE_OBJ = Immutable.fromJS({})

function getById(entityName, id) {
  const state = getStore().getState()
  return state.getIn([entityName]).get(id.toString())
}

export function getState(stateName) {
  const state = getStore().getState()
  return state.get(stateName)
}

export function getEntityStatus(entityName, options) {
  const state = getStore().getState()
  const statusPath = getEntityStatusPath(entityName, options)
  return state.getIn(['entityStatus', ...statusPath]) || EMPTY_IMMUTABLE_OBJ
}

export function getListState(entityName, options) {
  const entityStatus =  getEntityStatus(entityName, options)

  const ids = entityStatus.get('ids')
  const getByItemId = (id) => getById(entityName, id)

  return Immutable.fromJS({
    list: (ids || []).filter(getByItemId).map(getByItemId),
    status: entityStatus,
  })
}

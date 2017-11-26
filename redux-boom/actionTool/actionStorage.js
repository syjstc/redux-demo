const actionStorage = {}

export function setActions(stateName, actions) {
  actionStorage[stateName] = actions
}

export function getActions(stateName) {
  return actionStorage[stateName] || {}
}

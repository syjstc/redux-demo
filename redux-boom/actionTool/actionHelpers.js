export const actionTypeCreator = (envName, stateName, transformationName) => {
  return `${envName}/${stateName}/${transformationName}`
}

export const parseAction = (actionType) => {
  const actionName = actionType.split('/').pop()
  if (actionName.indexOf('@entity_') !== -1) {
    return actionName.split('@entity_')
  } else {
    return actionName.split('@')
  }
}

export const createActionCreator = (actionTypeName) => {
  return (payload) => {
    return {
      type: actionTypeName,
      payload,
    }
  }
}

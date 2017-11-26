import {
  parseAction
} from './actionTool'

function createReducer(allowedActionTypes, transformers, initData) {
  return (state=initData, action) => {
    if (!allowedActionTypes.includes(action.type)) {
      return state
    }

    const actionNames = parseAction(action.type)
    const handlerType = (typeof transformers[actionNames[0]]).toLowerCase()

    switch (handlerType) {
      case 'function':
        return transformers[actionNames[0]](state, action.payload)
      case 'object':
        // some async actions can defined sub actions
        /*
          e.g. fetch ->
                fetch request
                fetch success
                fetch failure
        */
        const subTransformers = transformers[actionNames[0]]
        const subActionName = actionNames[1]

        if (typeof subTransformers[subActionName] === 'function') {
          return subTransformers[subActionName](state, action.payload)
        } else {
          console.warn(`sub transformer ${actionNames[0]} - ${subActionName} should be a function`)
          return state
        }
      default:
        return state
    }
  }
}

export default createReducer

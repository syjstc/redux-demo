const createAsyncAction = (envName, stateName, typeNames, transformationName, requestFn) => {
  const { requestTypeName, successTypeName, failureTypeName } = typeNames

  return (options) => {
    return (dispatch) => {
      dispatch({
        type: requestTypeName,
        payload: options,
      })

      return requestFn(options).then((res) => {
        dispatch({
          type: successTypeName,
          payload: res,
        })
      }).catch(() => {
        dispatch({
          type: failureTypeName,
          payload: options,
        })
      })
    }
  }
}

export default createAsyncAction

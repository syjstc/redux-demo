export function fetchItemsRequest(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        list: {
          '1': {
            id: 1,
            text: 123111,
          },
          '2': {
            id: 2,
            text: 123222,
          }
        },
        ids: ['1', '2'],
      })
    }, 2000)
  })
}

export function addItemRequest(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload.data ? payload.data : payload)
    }, 1000)
  })
}

export function deleteItemRequest(payload) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(payload)
    }, 1000)
  })
}

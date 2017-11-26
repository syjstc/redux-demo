export const forEachObj = (fn, obj) => {
  for (let prop in obj) {
    let value = obj[prop]
    fn(value, prop)
  }
}

export const union = (arr, newArr) => {
  const neededEl = []
  newArr.forEach(item => {
    if (!arr.includes(item)) {
      neededEl.push(item)
    }
  })
  return arr.concat(neededEl)
}

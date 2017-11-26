import Immutable from 'immutable'

const INIT_STATE = Immutable.fromJS([])
const state = {
  initData: INIT_STATE,
  transformers: {
    addItem: (state, item) => {
      return state.push(Immutable.fromJS(item))
    },
    deleteItem: (state, id) => {
      return state.filter( item => item.get('id').toString() !== id )
    },
  }
}

export default state

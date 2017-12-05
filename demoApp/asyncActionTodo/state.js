import Immutable from 'immutable'
import {
  fetchItemsRequest,
  addItemRequest,
  deleteItemRequest,
} from '../apis'

const INIT_STATE = Immutable.fromJS({})
const state = {
  initData: INIT_STATE,
  transformers: {
    fetchItems: {
      request: (state) => state.set('isFetching', true),
      success: (state, { res }) => {
        let listData = Object.values(res.list)
        return state.set('isFetching', false).set('list', Immutable.fromJS(listData))
      },
      failure: (state) => state.set('isFetching', false),
    },
    addItem: {
      request: (state) => state.set('isAdding', true),
      success: (state, { res: item } ) => {
        let list = state.get('list')
        return state.set('list', list.push(Immutable.fromJS(item))).set('isAdding', false)
      },
      failure: (state) => state.set('isAdding', false),
    },
    deleteItem: {
      request: (state) => state.set('isDeleting', true),
      success: (state, { res: { resrouceId } }) => {
        let list = state.get('list')
        list = list.filter( item => item.get('id').toString() !== resrouceId.toString() )
        return state.set('list', list).set('isDeleting', false)
      },
      failure: (state) => state.set('isDeleting', false),
    }
  },
  apis: {
    fetchItems: fetchItemsRequest,
    addItem: addItemRequest,
    deleteItem: deleteItemRequest
  },
}

export default state

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
    fetchItems: (state, list) => Immutable.fromJS(list),
    addItem: (state, item) => state.set(item.id.toString(), Immutable.fromJS(item)),
    deleteItem: (state, { resourceId }) => state.remove(resourceId)
  },
  apis: {
    fetchItems: fetchItemsRequest,
    addItem: addItemRequest,
    deleteItem: deleteItemRequest
  },
  useEntityStatus: true,
}

export default state

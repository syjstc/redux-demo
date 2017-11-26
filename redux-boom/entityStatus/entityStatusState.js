import Immutable from 'immutable'
import { union } from '../utils'

const state = {
  initData: Immutable.fromJS({}),
  transformers: {
    setStatus: (state, { path, status }) => {
      let oldStatus = state.getIn(path)
      if (!oldStatus) {
        return state.mergeIn(path, status)
      }
      if (status.ids) {
        let ids = (oldStatus.get('ids') || Immutable.fromJS([])).toJS()
        ids = union(ids, status.ids)
        oldStatus = oldStatus.mergeDeep(status).set('ids', Immutable.fromJS(ids))
      } else {
        oldStatus = oldStatus.mergeDeep(status)
      }
      return state.setIn(path, oldStatus)
    }
  },
}

export default state

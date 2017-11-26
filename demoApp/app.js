import React from 'react'
import ReactDom from 'react-dom'
// import todoTransformers from './todoTransformers/asyncTransformers'
import { createStore } from 'redux-boom'

import syncTodoState from './syncActionTodo/state'
import asyncTodoState from './asyncActionTodo/state'
import asyncTodoWithEntityStatusState from './asyncActionWithEntityStatusTodo/state'

// import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

const store = createStore('demo', {
  todoSync: syncTodoState,
  todoAsync: asyncTodoState,
  todoAsyncWithEntityStatus: asyncTodoWithEntityStatusState,
})


const SyncTodo = require('./syncActionTodo/component').default
const AsyncTodo = require('./asyncActionTodo/component').default
const AsyncTodoWithEntityStatus = require('./asyncActionWithEntityStatusTodo/component').default

const App = () => 
  <Provider store={store}>
    <div>
      <SyncTodo />
      <AsyncTodo />
      <AsyncTodoWithEntityStatus />
    </div>
  </Provider>

ReactDom.render(<App />, document.getElementById('container'))



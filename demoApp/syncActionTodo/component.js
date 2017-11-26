import React from 'react'

import { connect } from 'react-redux'
import { getActions, getState } from 'redux-boom'

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  addItem() {
    this.props.addItem({
      id: new Date().getTime(),
      text: this.refs.input.value || 'default text',
    })
    this.refs.input.value = ''
  }

  removeItem(id) {
    this.props.deleteItem(id.toString())
  }

  render() {
    return (
      <div className="todo-wrapper">
        <h1>
          Sync Todo
        </h1>
        <div onClick={this.addItem}>
          click me to add an item
        </div>
        <input ref="input" />
        <div>
          {
            this.props.todos && this.props.todos.map((item) => {
              return (
                <div style={{ background: '#ccc', marginBottom: '10px'}} key={item.get('id')}>
                  <div onClick={() => this.removeItem(item.get('id'))}>
                    click me to remove me
                  </div>
                  <div>
                    { item.get('id') + ' text: ' + item.get('text') }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

const todoStateName = 'todoSync'

function mapStateToProps() {
  const list = getState(todoStateName)

  return {
    todos: list,
  }
}


export default connect(mapStateToProps, getActions(todoStateName))(Todo)


import React from 'react'

import { connect } from 'react-redux'
import { getActions, getListState } from 'redux-boom'

class Todo extends React.Component {
  constructor(props) {
    super(props)
    this.addItem = this.addItem.bind(this)
    this.removeItem = this.removeItem.bind(this)
  }

  componentDidMount() {
    this.props.fetchItems({
      statusType: 'category',
      statusValue: 'all',
    })
  }

  addItem() {
    this.props.addItem({
      data: {
        id: new Date().getTime(),
        text: this.refs.input.value || 'default text',
      },
    }).then(() => {
      this.refs.input.value = ''
    })
  }

  removeItem(id) {
    this.props.deleteItem({
      resourceId: id.toString()
    })
  }

  render() {
    return (
      <div className="todo-wrapper">
        <h1>
          AsyncWithEntityStatus Todo
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

const todoStateName = 'todoAsyncWithEntityStatus'


function mapStateToProps() {
  const state = getListState(todoStateName)

  return {
    todos: state.get('list'),
  }
}


export default connect(mapStateToProps, getActions(todoStateName))(Todo)



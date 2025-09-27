import React from 'react'
import './Todo.css'

export default class Todo extends React.Component {
  render() {
    const { done, name } = this.props
    return (
      <div className={done ? 'done' : ''}>
        <input
          type="checkbox"
          checked={done}
          onChange={this.handleCheck}
        />
        <span>{name}</span>
      </div>
    )
  }

  handleCheck = (e) =>
    this.props.onDone(e.target.checked, this.props.id)
}

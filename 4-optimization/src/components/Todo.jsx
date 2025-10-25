import React from 'react'
import './Todo.css'

// ! WARN: Using PureComponent to implement shouldComponentUpdate !
export default class Todo extends React.PureComponent {
  // Manual way of controlling re-rendering
  // shouldComponentUpdate(nextProps) {
  //   return (
  //     nextProps.done !== this.props.done ||
  //     nextProps.name !== this.props.name ||
  //     nextProps.id !== this.props.id
  //   )
  // }

  render() {
    const { done, name, id } = this.props
    console.log('Todo renders: ', id)

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

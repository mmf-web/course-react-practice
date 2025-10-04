import React, { useCallback, useMemo, useState } from 'react'
import './Todo.css'

function fib(n) {
  if (n === 0) return 0
  if (n === 1) return 1
  return fib(n - 1) + fib(n - 2)
}

export default function Todo({ done, name, onDone, id }) {
  const handleCheck = useCallback(
    (e) => onDone(e.target.checked, id),
    [id, onDone]
  )

  const className = useMemo(() => (done ? 'done' : ''), [done])

  return (
    <div className={className}>
      <input type="checkbox" checked={done} onChange={handleCheck} />
      <span>{name}</span>
    </div>
  )
}

class Todo2 extends React.Component {
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

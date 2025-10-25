import React from 'react'
import './Todo.css'

// ! WARN: Using React.memo to implement shouldComponentUpdate !
// export default React.memo(TodoFunctional)

export default React.memo(TodoFunctional, (prevProps, nextProps) => {
  if (
    Object.keys(prevProps).length !== Object.keys(nextProps).length
  ) {
    return false
  }

  for (const key in prevProps) {
    if (prevProps[key] !== nextProps[key]) {
      return false
    }
  }

  return true
})

function TodoFunctional({ done, name, id, onDone }) {
  console.log('TodoFunctional renders: ', id)
  const handleCheck = (e) => onDone(e.target.checked, id)
  return (
    <div className={done ? 'done' : ''}>
      <input type="checkbox" checked={done} onChange={handleCheck} />
      <span>{name}</span>
    </div>
  )
}

import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
} from 'react'
import TodoFunctional from './TodoFunctional'
import generateTodos from './generate-todos'

function DocumentClick() {
  const [count, setCount] = useState(0)

  // componentDidMount, componentWillUnmount
  useEffect(() => {
    const f = () => {
      console.log('click')
      setCount((prev) => prev + 1)
    }
    document.addEventListener('click', f)
    return () => {
      // ! Cleanup
      console.log('DocumentClick unmount')
      document.removeEventListener('click', f)
    }
  }, [])

  return <div>Clicks: {count}</div>
}

export default function AppFunctional() {
  const [loading, setLoading] = useState(true)
  const [name, setName] = useState('')
  const [todos, setTodos] = useState([])
  const [filteredDone, setFilteredDone] = useState(false)
  const [filteredName, setFilteredName] = useState('')
  const [filters, setFilters] = useState([])

  // componentDidMount
  useEffect(() => {
    setLoading(true)
    setTimeout(() => {
      setTodos(generateTodos(10))
      setLoading(false)
    }, 500)
  }, [])

  const handleAddTodo = () => {
    setTodos([...todos, { name, done: false, id: Date.now() }])
    setName('')
  }

  // ! VERY BAD
  // const [handleSetDone, setHandleSetDone] = useState(null)
  // useEffect(() => {
  //   setHandleSetDone(() => (done, id) => {
  //     setTodos(todos.map((x) => (x.id === id ? { ...x, done } : x)))
  //   })
  // }, [todos])

  // ! LESS BAD
  // const [handleSetDone, setHandleSetDone] = useState(null)
  // useEffect(() => {
  //   const fn = (done, id) => {
  //     setTodos((todos) =>
  //       todos.map((x) => (x.id === id ? { ...x, done } : x))
  //     )
  //   }
  //   // setHandleSetDone(fn) // ! EVEN MORE BAD
  //   setHandleSetDone(() => fn)
  // }, [])

  // ! SLIGHTLY BETTER
  // const handleSetDone = useMemo(
  //   () => (done, id) => {
  //     setTodos((todos) =>
  //       todos.map((x) => (x.id === id ? { ...x, done } : x))
  //     )
  //   },
  //   []
  // )

  const handleSetDone = useCallback((done, id) => {
    setTodos((todos) =>
      todos.map((x) => (x.id === id ? { ...x, done } : x))
    )
  }, [])

  const handleSetName = (e) => setName(e.target.value)

  const handleAddFilter = (key, fn) => {
    setFilters([...filters.filter((f) => f.key !== key), { key, fn }])
  }

  const handleSetFilteredDone = (e) => {
    setFilteredDone(e.target.checked)
    handleAddFilter('fd', (todo) =>
      e.target.checked ? !todo.done : true
    )
  }

  const handleSetFilteredName = (e) => {
    let value = e.target.value
    setFilteredName(value)
    handleAddFilter('filteredName', (todo) =>
      todo.name.includes(value)
    )
  }

  return (
    <div>
      {loading && <DocumentClick />}
      <section>
        <div>
          Not done
          <input
            type="checkbox"
            checked={filteredDone}
            onChange={handleSetFilteredDone}
          />
        </div>
        <div>
          Name:
          <input
            type="text"
            checked={filteredName}
            onChange={handleSetFilteredName}
          />
        </div>
      </section>
      <div>
        <input value={name} onChange={handleSetName} />
        <button onClick={handleAddTodo}>Save</button>
      </div>
      {loading && <div>Loading...</div>}
      {todos
        .filter((todo) => {
          // for (const f of filters) {
          //   if (!f(todo)) {
          //     return false
          //   }
          // }
          // return true
          return filters.every((fObj) => fObj.fn(todo))
        })
        .sort((a, b) => a.done - b.done)
        .map((todo) => (
          <TodoFunctional
            key={todo.id}
            name={todo.name}
            done={todo.done}
            id={todo.id}
            onDone={handleSetDone}
          />
        ))}
    </div>
  )
}

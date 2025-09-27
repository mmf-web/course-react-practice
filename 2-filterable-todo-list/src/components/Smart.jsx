import React from 'react'
import Todo from './Todo'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      todos: [
        { name: '123', done: true, id: 1 },
        { name: '234', done: false, id: 2 },
      ],
      filteredDone: false,
      filteredName: '',
      filters: [],
    }
  }

  render() {
    const { todos, name, filteredDone, filteredName, filters } =
      this.state
    return (
      <div>
        <section>
          <div>
            Not done
            <input
              type="checkbox"
              checked={filteredDone}
              onChange={this.handleSetFilteredDone}
            />
          </div>
          <div>
            Name:
            <input
              type="text"
              checked={filteredName}
              onChange={this.handleSetFilteredName}
            />
          </div>
        </section>
        <div>
          <input value={name} onChange={this.handleSetName} />
          <button onClick={this.handleAddTodo}>Save</button>
        </div>
        {todos
          .filter((todo) => {
            // for (const f of filters) {
            //   if (!f(todo)) {
            //     return false
            //   }
            // }
            // return true
            return filters.every((f) => f(todo))
          })

          .map((todo) => (
            <Todo
              name={todo.name}
              done={todo.done}
              id={todo.id}
              onDone={this.handleSetDone}
            />
          ))}
      </div>
    )
  }

  handleAddTodo = () =>
    this.setState({
      name: '',
      todos: [
        ...this.state.todos,
        { name: this.state.name, done: false, id: Date.now() },
      ],
    })

  handleSetDone = (done, id) =>
    this.setState({
      todos: this.state.todos.map((x) =>
        x.id === id ? { ...x, done } : x
      ),
    })

  handleSetName = (e) => this.setState({ name: e.target.value })

  handleSetFilteredDone = (e) => {
    let key = 'filteredDone'
    const f = (todo) => (e.target.checked ? !todo.done : true)
    f.key = key
    return this.setState({
      filteredDone: e.target.checked,
      filters: [
        ...this.state.filters.filter((f) => f.key !== key),
        f,
      ],
    })
  }

  handleSetFilteredName = (e) => {
    let value = e.target.value
    let key = 'filteredName'
    let f = (todo) => todo.name.includes(value)
    f.key = key
    return this.setState({
      filteredName: value,
      filters: [
        ...this.state.filters.filter((f) => f.key !== key),
        f,
      ],
    })
  }
}

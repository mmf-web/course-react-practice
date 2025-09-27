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
    }
  }

  render() {
    const { todos, name, filteredDone, filteredName } = this.state
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
            let ok = true
            if (filteredDone) {
              ok = ok && todo.done === false
            }
            if (filteredName) {
              ok &&= todo.name.includes(filteredName)
            }
            return ok
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

  handleSetFilteredDone = (e) =>
    this.setState({ filteredDone: e.target.checked })

  handleSetFilteredName = (e) =>
    this.setState({ filteredName: e.target.value })
}

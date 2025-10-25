import React from 'react'
import Todo from './Todo'
import generateTodos from './generate-todos'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: true,
      name: '',
      todos: [],
      filteredDone: false,
      filteredName: '',
      filters: [],
    }
  }

  componentDidMount() {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({
        todos: generateTodos(10),
        loading: false,
      })
    }, 500)
  }

  render() {
    const {
      todos,
      name,
      filteredDone,
      filteredName,
      filters,
      loading,
    } = this.state

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
            <Todo
              key={todo.id}
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
    this.setState({ filteredDone: e.target.checked })
    this.handleAddFilter('fd', (todo) =>
      e.target.checked ? !todo.done : true
    )
  }

  handleSetFilteredName = (e) => {
    let value = e.target.value
    this.setState({ filteredName: value })
    this.handleAddFilter('filteredName', (todo) =>
      todo.name.includes(value)
    )
  }

  handleAddFilter = (key, fn) => {
    this.setState({
      filters: [
        ...this.state.filters.filter((f) => f.key !== key),
        { key, fn },
      ],
    })
  }

  // Пример добавления нового фильтра
  // handleSetFilteredName = (e) => {
  //   const type = 'важная'
  //   this.handleAddFilter('filtertype', (todo) =>
  //     type ? todo.type == type : true
  //   )
  // }
}

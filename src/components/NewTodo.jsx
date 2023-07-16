import React, { Component } from 'react'
import './NewTodo.css'

export default class NewTodo extends Component {

  constructor(props) {
    super(props);
    this.state = { task: "" }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addTask(this.state)
    this.setState(({
      task: "",
    }))
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div className="new-todo-container">
        <h3 className='add-task-header' id="header">Add a New Task</h3>
          <form onSubmit={this.handleSubmit} className='new-todo-form'>
          <div className="input-container">
            <label className='new-todo-header' htmlFor="task"></label>
            <input
              placeholder="Add a task.."
              className='todo-input'
              type="text"
              name="task"
              value={this.state.task}
              onChange={this.handleChange}
            />
            <button className='todo-button' onSubmit={this.handleSubmit}>Add Task</button>
          </div>
        </form>
      </div>
    )
  }
}

import React, { Component } from 'react'
import './Todo.css'

export default class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      task: this.props.task
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.handleEditing = this.handleEditing.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleRemove() {
    this.props.deleteTodo(this.props.id);
  }

  handleEditing() {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing
    }));
  }

  toggleCompletion() {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === this.props.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      }),
    }));
  }

  handleUpdate(event) {
    event.preventDefault();
    this.props.change(this.props.id, this.state.task)
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing
    }));
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

render() {

  let task;

  if (this.state.isEditing) {
    task = (
      <div>
        <form onSubmit={this.handleUpdate} onChange={this.handleChange}>
          <ul className="todo-items">
            <li className="item">
              <textarea
                name="task"
                value={this.state.task}
                onChange={this.state.handleChange}
                cols="30"
                rows="1"
                placeholder="Write the task..">
              </textarea>
              <button className='todo-submit-button'>Save</button>
            </li>
          </ul>
        </form>
      </div>
    )
  } else {
    task = (
      <div>
        <ul className={`todo-items ${this.props.complete ? 'complete' : ''}`}>
          <li className="item">
            {this.props.id}. {this.props.task}
            <div className="icons-div">
              <i id="fa-icon" className="fa-regular fa-pen-to-square" onClick={this.handleEditing}></i>
              {this.props.complete ? (
                <i onClick={this.props.toggleCompletion} id="fa-icon" className="fa-solid fa-rotate-left"></i>
              ) : (
                <i onClick={this.props.toggleCompletion} id="fa-icon" className="fa-solid fa-check"></i>
              )}
              <i onClick={() => this.props.deleteTodo(this.props.id)} id="fa-icon" className="fa-regular fa-trash-can"></i>
            </div>
          </li>
        </ul>
      </div>
    )
  }
  return task;
}};

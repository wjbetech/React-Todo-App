import React, { Component } from 'react'
import './Todo.css'

export default class Todo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          task: this.props.task,
        }
      ]
    }
    this.handleRemove = this.handleRemove.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
  }

  handleRemove() {
    this.props.deleteTodo(this.props.id);
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

render() {
  return (
    <div>
      <ul className={`todo-items ${this.props.complete ? 'complete' : ''}`}>
        <li className="item">
          {this.props.id}. {this.props.task}
          <div className="icons-div">
            <i id="fa-icon" className="fa-regular fa-pen-to-square"></i>
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
  );
}}

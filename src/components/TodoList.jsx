import React, { Component } from 'react';
import Todo from './Todo';
import NewTodo from './NewTodo';
import './TodoList.css';
import { v4 as  uuidv4 } from 'uuid';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.addTask = this.addTask.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.delete = this.delete.bind(this);
    this.change = this.change.bind(this);
  }

  addTask(newTodo) {
    const { task } = newTodo;
    const newTask = {
      id: uuidv4(),
      task: task,
      complete: false
    };
    this.setState(prevState => ({
      todos: [...prevState.todos, newTask]
    }));
  }

  delete(id) {
    this.setState(prevState => ({
      todos: prevState.todos.filter(t => t.id !== id).map((todo, index) => ({
        ...todo,
        id: index + 1
      }))
    }));
  }

  toggleCompletion(id) {
    this.setState(prevState => ({
      todos: prevState.todos.map(todo => {
        if (todo.id === id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      }),
    }));
  }

  change(id, update) {
    const updatedTodo = this.state.todos.map(todo => {
      if (todo.id === id) {
        return { ...todo, task: update }
      }
      return updatedTodo;
     })
    this.setState({ todos: updatedTodo })
  };


 render() {

    const todos = this.state.todos.map((todo, index) => {
    return (
      <div key={todo.id}>
        <Todo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          index={index}
          complete={todo.complete}
          deleteTodo={this.delete}
          toggleCompletion={() => this.toggleCompletion(todo.id)}
          change={this.change}
        />
      </div>
    );
  });

    return (
      <div className="todo-container">
        <h1>To Do</h1>

        {/* conditionally render no task or tasks */}
        {todos.length < 1
          ? <h3>- You have no tasks to do -</h3>
          : todos
        }

        {/* new todo form */}
        <NewTodo addTask={this.addTask} />
      </div>
    );
  }
}

import React, { Component } from 'react';
import Todo from './Todo';
import NewTodo from './NewTodo';
import './TodoList.css';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: []
    };
    this.addTask = this.addTask.bind(this);
    this.toggleCompletion = this.toggleCompletion.bind(this);
    this.delete = this.delete.bind(this);
    // this.handleEdit = this.handleEdit.bind(this);
  }

  getNextId() {
    const { todos } = this.state;
    return todos.length === 0 ? 1 : Math.max(...todos.map(todo => todo.id)) + 1;
  }

  addTask(newTodo) {
    const { task } = newTodo; // Extract the 'task' property from 'newTodo'
    const newTask = {
      id: this.getNextId(),
      task: task, // Use the extracted 'task' property here
      complete: false
    };
    this.setState(prevState => ({
      todos: [...prevState.todos, newTask]
    }));
  }

  delete(id) {
    this.setState({
      todos: this.state.todos.filter(t => t.id !== id)
    });
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


 render() {

    const todos = this.state.todos.map(todo => {
    return (
      <div key={todo.id}>
        <Todo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          complete={todo.complete}
          deleteTodo={this.delete}
          toggleCompletion={() => this.toggleCompletion(todo.id)} // Pass the toggleCompletion method as a prop
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

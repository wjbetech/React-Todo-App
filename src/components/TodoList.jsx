import React, { Component } from 'react'
import NewTodo from './NewTodo';
import './TodoList.css'

export default class TodoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: [
        {
          id: 1,
          task: "Learn about rest parameters in modern JavaScript",
          complete: false,
        },
        {
          id: 2,
          task: "Buy new coffee capsules for the nespresso",
          complete: false,
        }
      ]
    }
    this.addItem = this.addItem.bind(this);
    this.handleCompleted = this.handleCompleted.bind(this);
  }

  addItem(item) {
    let newItem = {...item, id: this.state.items.length + 1 };
    this.setState(prevState => ({
      items: [...prevState.items, newItem]
    }))
  }

  deleteItem(item) {
    this.setState(prevState => ({
      items: prevState.items.filter(i => i !== item)
    }))
  }

  handleCompleted(item) {
    this.setState(prevState => {
      const updatedItems = prevState.items.map(prevItem => {
        if (prevItem.id === item.id) {
          return {
            ...prevItem,
            complete: !prevItem.complete
          };
        }
        return prevItem;
      });

      return {
        items: updatedItems
      };
    });
  }

  render() {
    return (
      <div className="todo-container">
        <h1>To Do</h1>
        <li className="todo-items">
          {this.state.items.map(item => (
            <ul className={`item ${item.complete ? 'completed' : ''}`} key={item.id}>{item.id}: {item.task}
              <div className='icons-div'>
                <i id="fa-icon" className="fa-regular fa-pen-to-square"></i>
                {item.complete ? <i onClick={() => this.handleCompleted(item)}id="fa-icon" className="fa-solid fa-rotate-left"></i> : <i onClick={() => this.handleCompleted(item)}id="fa-icon" className="fa-solid fa-check"></i>}
                <i onClick={() => this.deleteItem(item)} id="fa-icon" className="fa-regular fa-trash-can"></i>
              </div>
            </ul>
          ))}
        </li>
        <NewTodo addItem={this.addItem} />
      </div>
    )
  }
}

import React, { Component } from "react";
import "./App.css";
import CreateItem from "./Components/createItem";
import ToDoList from "./Components/toDoList";
import axios from "axios";

const toDoItems = [
  {
    name: "Hello, World!",
    completed: false,
  },
  {
    name: "My task #37",
    completetd: false,
  },
  {
    name: "Task with HTML",
    completed: false,
  },
  {
    name: "Have fun!",
    completed: false,
  },
];

export class App extends Component {
  componentDidMount() {
    axios.get(`https://demo.minder.care/interview/task`).then((res) => {
      console.log("res", res);
    });
  }
  constructor(props) {
    super(props);

    this.state = {
      toDoItems,
    };
  }

  createItem(item) {
    this.state.toDoItems.unshift({
      name: item,
      completed: false,
    });
    this.setState({
      toDoItems: this.state.toDoItems,
    });
  }

  findItem(item) {
    return this.state.toDoItems.filter((element) => element.name === item)[0];
  }

  toggleComplete(item) {
    let selectedItem = this.findItem(item);
    selectedItem.completed = !selectedItem.completed;
    this.setState({ toDoItems: this.state.toDoItems });
  }

  saveItem(oldItem, newItem) {
    let selectedItem = this.findItem(oldItem);
    selectedItem.name = newItem;
    this.setState({ toDoItems: this.state.toDoItems });
  }

  deleteItem(item) {
    let index = this.state.toDoItems.map((element) => element.name).indexOf(item);
    this.state.toDoItems.splice(index, 1);
    this.setState({ toDoItems: this.state.toDoItems });
  }

  render() {
    return (
      <div className="to-do-app">
        <div className="header">
          <h1>ToDo List Web App</h1>
        </div>
        <CreateItem toDoItems={this.state.toDoItems} createItem={this.createItem.bind(this)} />
        <ToDoList toDoItems={this.state.toDoItems} deleteItem={this.deleteItem.bind(this)} saveItem={this.saveItem.bind(this)} toggleComplete={this.toggleComplete.bind(this)} />
      </div>
    );
  }
}

export default App;

import React from 'react';
import logo from './logo.svg';
import './App.css';
import Listitems from './list-items';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
library.add(faTrash);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currentItem: {
        text: '', key: ''
      }
    }
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.setUpdateItem = this.setUpdateItem.bind(this);
  }

  handleInput(event) {
    this.setState({
      currentItem: {
        text: event.target.value,
        key: Date.now()
      }
    })
  }

  addItem(event) {
    event.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if (newItem.text) {
      const items = [...this.state.items, newItem];
      this.setState({
        items: items,
        currentItem: {
          text: '',
          key: ''
        }
      });
    }
  }

  deleteItem(key) {
    const filterItems = this.state.items.filter(item => item.key !== key);
    this.setState({
      items: filterItems
    });
  }

  setUpdateItem(text, key) {
    const items = this.state.items;
    items.map(item => {
      if(item.key === key) {
        item.text = text;
      }
    });
  }

  render() {
    return(
      <div className="App">
        <header>
          <form id="inputFrom" onSubmit={this.addItem}>
            <input type="text" placeholder="Please enter" value={this.state.currentItem.text} onChange={this.handleInput}/>
            <button type="submit">Add</button>
          </form>
        </header>
        <Listitems items={this.state.items} deleteItem = {this.deleteItem} setUpdateItem = {this.setUpdateItem}></Listitems>
      </div>
    )
  }
}
export default App;

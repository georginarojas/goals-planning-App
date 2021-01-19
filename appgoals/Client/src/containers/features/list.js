import React, { Component } from "react";

import AddItem from "../../components/features/list/addItem";
import ItemsList from "../../components/features/list/itemList";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
    };
    this.addItem = this.addItem.bind(this);
    this.updateListAfterDeletion = this.updateListAfterDeletion.bind(this);
    this.completeItem = this.completeItem.bind(this);
  }

  addItem(item) {
    let list = this.state.list;
    let el = { item, completed: false };
    list.push(el);
    this.setState({ list });
  }

  updateListAfterDeletion(list) {
    this.setState({ list });
  }

  completeItem(currentItem) {
    console.log("Current Item ", currentItem);
    let listItems = this.state.list;
    console.log("List Items completed ", listItems);
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i] === currentItem) {
        listItems[i].completed = !listItems[i].completed;
        break;
      }
    }
  }

  render() {
    let { list } = this.state;
    console.log("List ", list);
    return (
      <div>
        <h3> List:</h3>
        <AddItem addNewItem={this.addItem} />
        <ItemsList
          items={list}
          updateList={this.updateListAfterDeletion}
          completeItem={this.completeItem}
        />
      </div>
    );
  }
}
export default List;

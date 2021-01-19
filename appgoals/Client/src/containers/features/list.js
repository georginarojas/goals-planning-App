import React, { Component } from "react";

import Header from "../../components/utils/header";
import ItemStats from "../../components/utils/itemStats";
import AddItem from "../../components/features/list/addItem";
import ItemsList from "../../components/features/list/itemList";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      finished: 0,
      percentDone: 0,
    };
    this.addItem = this.addItem.bind(this);
    this.updateListAfterDeletion = this.updateListAfterDeletion.bind(this);
    this.completeItem = this.completeItem.bind(this);
  }

  addItem(item) {
    let list = this.state.list;
    let el = { item, completed: false };
    list.push(el);
    this.setState({ list }, () => {
      this.countFinishedItems();
    });
  }

  completeItem(currentItem) {
    let listItems = this.state.list;
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i] === currentItem) {
        listItems[i].completed = !listItems[i].completed;
        this.countFinishedItems();
        break;
      }
    }
  }

  countFinishedItems() {
    let listItems = this.state.list;
    let finished = 0;
    for (let i = 0; i < listItems.length; i++) {
      if (listItems[i].completed) {
        finished++;
      }
    }
    this.setState({ finished }, () => {
      this.percentCompletion();
    });
  }

  percentCompletion() {
    let totalItems = this.state.list.length,
      finishedItems = this.state.finished,
      percentDone = Math.floor((finishedItems / totalItems) * 100);
    percentDone = isNaN(percentDone) ? 0 : percentDone;
    this.setState({ percentDone });
  }

  updateListAfterDeletion(list) {
    this.setState({ list }, () => {
      this.countFinishedItems();
    });
  }

  render() {
    let { list, percentDone, finished } = this.state;
    console.log(`Percent: ${percentDone}, Completed: ${finished}`);
    return (
      <div>
        <Header />
        <h3> List:</h3>
        <ItemStats
          list={list}
          percentDone={percentDone}
          finished={finished}
          name={"items"}
        />
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

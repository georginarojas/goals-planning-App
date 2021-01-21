import React, { Component } from "react";

import Header from "../../components/utils/header";
import ItemStats from "../../components/utils/itemStats";
import AddItem from "../../components/features/list/addItem";
import ItemsList from "../../components/features/list/itemList";
import SelectPriority from "../../components/utils/selectPriority";
import RadioPriority from "../../components/utils/radioPriority";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      priority: "low",
      list: [],
      finished: 0,
      percentDone: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.addItem = this.addItem.bind(this);
    this.updateListAfterDeletion = this.updateListAfterDeletion.bind(this);
    this.completeItem = this.completeItem.bind(this);
  }

  handleChange(e) {
    console.log("Value  name ", e.target.value, e.target.name);
    console.log("Target ", e.target);
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  addItem(item) {
    let list = this.state.list;
    let priority = this.state.priority;
    let el = { item, completed: false , priority};
    list.push(el);
    this.setState({ list, priority: "low" }, () => {
      this.countFinishedItems();
    });
    // this.setState({});
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
    let { list, percentDone, finished, priority } = this.state;
    // console.log(`Percent: ${percentDone}, Completed: ${finished}`);
    console.log("Priority ", priority);
    return (
      <div>
        <Header />
        <h3> List:</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={this.handleChange}
        />

        <ItemStats
          list={list}
          percentDone={percentDone}
          finished={finished}
          name={"items"}
        />

        {/* <SelectPriority
          value={priority}
          onChange={this.handleChange}
          name={"priority"}
          id={"select-priority-list"}
        /> */}

        <RadioPriority 
          id={"radio-priority-list"}
          name={"priority"}
          value={priority}
          onChange={this.handleChange}
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

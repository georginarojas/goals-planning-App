import React, { Component } from "react";

import Header from "../../components/utils/header";
import ItemStats from "../../components/utils/itemStats";
import AddItem from "../../components/features/list/addItem";
import ItemsList from "../../components/features/list/itemList";
// import SelectPriority from "../../components/utils/selectPriority";
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
    this.updateList = this.updateList.bind(this);
    this.completeItem = this.completeItem.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  addItem(item) {
    let list = this.state.list;
    let priority = this.state.priority;
    let el = { item, completed: false , priority};
    //list.push(el);
    let x = [...list, el];
    this.setState({ list: x, priority: "low" }, () => {
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
    // Usar Array.reduce
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

  updateList(list) {
    console.log("****** UPDATE ", list);
    this.setState({ list }, () => {
      this.countFinishedItems();
    });
  }

  render() {
    let { list, percentDone, finished, priority } = this.state;
    // console.log(`Percent: ${percentDone}, Completed: ${finished}`);
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
          visibility={true}
        />

        <AddItem addNewItem={this.addItem} />
        <ItemsList
          items={list}
          updateList={this.updateList}
          completeItem={this.completeItem}
        />
      </div>
    );
  }
}
export default List;

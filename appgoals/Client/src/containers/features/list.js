import React, { Component } from "react";

import Header from "../../components/utils/header";
import ItemStats from "../../components/utils/itemStats";
import AddItem from "../../components/features/list/addItem";
import ItemsList from "../../components/features/list/itemList";
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
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.filterList = this.filterList.bind(this);
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  // ----- ADD NEW ITEM -------- //
  addItem(item) {
    let list = this.state.list;
    let priority = this.state.priority;
    let el = { item, completed: false, priority };
    //list.push(el);
    let x = [...list, el];
    this.setState({ list: x, priority: "low" }, () => {
      this.countFinishedItems();
    });
  }

  // ----- SET COMPLETED FIELD -------- //
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

  // ----- COUNTER FINISHED_ITEMS -------- //
  countFinishedItems() {
    let listItems = this.state.list;
    // let finished = 0;
    // for (let i = 0; i < listItems.length; i++) {
    //   if (listItems[i].completed) {
    //     finished++;
    //   }
    // }

    // >>>> Using Array.reduce
    let finished = listItems.reduce((prev, curr) => {
      return curr.completed ? prev + 1 : prev;
    }, 0);

    this.setState({ finished }, () => {
      this.percentCompletion();
    });
  }

  // ----- PERCENT COMPLETION ITEM -------- //
  percentCompletion() {
    let totalItems = this.state.list.length,
      finishedItems = this.state.finished,
      percentDone = Math.floor((finishedItems / totalItems) * 100);
    percentDone = isNaN(percentDone) ? 0 : percentDone;
    this.setState({ percentDone });
  }

  // ----- UPDATE LIST -------- //
  updateList(list) {
    // console.log("****** UPDATE ", list);
    this.setState({ list }, () => {
      this.countFinishedItems();
    });
  }

  
  // ----- SUBMIT LIST -------- //
  handleSubmit(e){
    e.preventDefault();
    let { list, title} = this.state;
    let newList = this.filterList(list);
    console.log(">> FILTER list ", newList);

    if(title === "" ){
      console.log("error")
    } else{
      console.log("SUBMIT")

    }
  }

  // ----- FILTER LIST -------- //
  filterList= (list) =>{
  let newList =  list.filter((curr) => {
      return curr.item !== "";
    });
    console.log("FILTER ", newList);
    return newList;
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
          required
        />

        <ItemStats
          list={list}
          percentDone={percentDone}
          finished={finished}
          name={"items"}
        />

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

        <div>
          <button type="submit" onClick={this.handleSubmit}>
            Save
          </button>
        </div>
      </div>
    );
  }
}
export default List;

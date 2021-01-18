import React, { Component } from "react";

import Header from "../../components/utils/header";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isNewEl: false,
      tittle: "",
    };
    this.toggleNewEl = this.toggleNewEl.bind(this);
    this.addElement = this.addElement.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
  }

  toggleNewEl(e) {
    e.preventDefault();
    this.setState({ isNewEl: true });
  }

  handleChangeList(e) {
    e.preventDefault();
    let name = e.target.name;
    let value = e.target.value;
    this.setState({ [name]: value });
  }

  handleChange(i, event) {
    console.log("Handle change 2 i: ", i);
    let list = [...this.state.list];
    list[i] = event.target.value;
    this.setState({ list });
  }

  addElement(e) {
    e.preventDefault();
    console.log("Add element 2");
    this.setState((prevState) => ({ list: [...prevState.list, ""] }));
  }

  removeElement(i) {
    console.log("remove  i", i);
    let list = [...this.state.list];
    list.splice(i, 1);
    this.setState({ list });
  }

  render() {
    const { isNewEl, list } = this.state;
    console.log("LISt ", list);
    return (
      <div className="list">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <h3>New list</h3>
          <input
            type="text"
            name="tittle"
            placeholder="Tittle"
            onChange={this.handleChangeList}
          />

          {list.map((el, i) => {
            console.log(" map ", el, i);
            return (
              <div key={i}>
                <input
                  type="text"
                  value={el || ""}
                  onChange={this.handleChange.bind(this, i)}
                />
                <input
                  type="button"
                  value="Remove"
                  onClick={this.removeElement.bind(this, i)}
                />
              </div>
            );
          })}

          <button onClick={this.addElement}>Add element</button>
        </form>
      </div>
    );
  }
}
export default List;

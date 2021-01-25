import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

import Header from "../../components/utils/header";
import CheckButton from "../../components/utils/checkBtn";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      isChecked: [],
      tittle: "",
    };

    this.addElement = this.addElement.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeElement = this.removeElement.bind(this);

    this.toggleCheck = this.toggleCheck.bind(this);
  }

  toggleCheck(i, e) {
    e.preventDefault();
    console.log("Toggle checkBtn i ", i);
    let isChecked = [...this.state.isChecked];
    isChecked[i] = !this.state.isChecked[i];
    this.setState({ isChecked });
  }

  handleChange(i, event) {
    event.preventDefault();
    console.log("EVENt target ", event.target);
    if (event.target.className === "element-input") {
      console.log("Handle change map i: ", i);
      let list = [...this.state.list];
      list[i] = event.target.value;
      this.setState({ list });
    } else {
      console.log("Handle change ");
      let name = event.target.name;
      let value = event.target.value;
      this.setState({ [name]: value });
    }
  }

  // addElement(e) {
  //   e.preventDefault();
  //   console.log("Add element 2");
  //   this.setState((prevState) => ({ list: [...prevState.list, ""] }));
  // }

  addElement(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      console.log("Add element 2");
      this.setState((prevState) => ({ list: [...prevState.list, ""] }));
    }
  }

  removeElement(i, e) {
    e.preventDefault();
    console.log("remove  i", i);
    let list = [...this.state.list];
    list.splice(i, 1);
    this.setState({ list });
  }

  render() {
    const { list, isChecked } = this.state;
    console.log("LISt isChecked ", list, isChecked);
    return (
      <div className="list">
        <Header />
        <form onSubmit={this.handleSubmit}>
          <h3>New list</h3>
          <input
            type="text"
            name="tittle"
            placeholder="Tittle"
            onChange={(e) => this.handleChange(null, e)}
          />

          {list.map((el, i) => {
            console.log(" map ", el, i);
            return (
              <div key={i}>
                <input
                  type="text"
                  value={el || ""}
                  className="element-input"
                  // onChange={this.handleChange.bind(this, i)}
                  onChange={(e) => this.handleChange(i, e)}
                />
                <button onClick={(e) => this.removeElement(i, e)}>
                  <FontAwesomeIcon icon={faTimes} />
                </button>
                <span onClick={(e) => this.toggleCheck(i, e)}>
                  <CheckButton isChecked={isChecked[i]} />
                </span>
              </div>
            );
          })}

          {/* <button onClick={this.addElement}>Add element</button> */}
          <input
            type="text"
            placeholder="New element"
            onKeyPress={this.addElement}
          />
          <input type="checkbox" value="completed" />
        </form>
      </div>
    );
  }
}
export default List;

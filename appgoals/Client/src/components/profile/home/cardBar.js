import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import EditBtn from "../../utils/editBtn";
import "./card.css";

class CardBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newInput: false,
      title: "",
    };
    this.toggleNew = this.toggleNew.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let value = e.target.value;
    console.log("Card bar ", value);
    this.setState({ title: value });
  }

  handleInput(e) {
    e.preventDefault();
    this.toggleNew();
    e.stopPropagation();
  }

  toggleNew() {
    this.setState({ newInput: !this.state.newInput });
  }

  render() {
    console.log("Card bar ", this.state.title);
    var visibility = "hide";
    if (this.props.visibility) {
      visibility = "show";
    }
    return (
      <div id={this.props.id} className={visibility}>
        <input
          placeholder={this.props.name + " " + "tittle"}
          name="title"
          onChange={this.handleChange}
        />
        <button onClick={this.handleInput}>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        <div className="cardBar-editBtn">
          <EditBtn url="/list" />
        </div>

        {this.state.newInput ? <input placeholder="New bar" /> : null}
      </div>
    );
  }
}
export default CardBar;

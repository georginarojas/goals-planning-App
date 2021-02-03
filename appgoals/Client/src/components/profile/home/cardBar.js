import React, { Component } from "react";

import RegisterGoal from "../../features/registerGoal";
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
    console.log("#### Card bar PROPS ", this.props);
    var visibility = "hide";
    if (this.props.visibility) {
      visibility = "show";
    }
    return (
      <div id={this.props.id} className={visibility}>
        <RegisterGoal
          id={this.props.user._id}
          name={this.props.name}
          props={this.props}
        />

        <div className="cardBar-editBtn">
          <EditBtn url="/list" />
        </div>

        {this.state.newInput ? <input placeholder="New bar" /> : null}
      </div>
    );
  }
}
export default CardBar;

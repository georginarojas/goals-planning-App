import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

import RadioPriority from "../utils/radioPriority";

class PriorityBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.handlePriority = this.handlePriority.bind(this);
    this.toggleShow = this.toggleShow.bind(this);
  }

  handlePriority(e) {
    // e.preventDefault();
    let value = e.target.value;
    console.log("Handle ", value);
    let list = this.props.list;
    let idx = this.props.idx;
    list[idx].priority = value;
    console.log("LIST new ", list);
    this.props.updateList(list);
    // e.stopPropagation();
  }

  toggleShow(e) {
    e.preventDefault();
    this.setState({ show: !this.state.show });
    e.stopPropagation();
  }


  color = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "medium":
        return "yellow";
      case "low":
        return "green";
      default:
        return "green";
    }
  };

  render() {
    return (
      <div>
        <button onClick={this.toggleShow}>
          <FontAwesomeIcon
            icon={faCircle}
            color={this.color(this.props.item.priority)}
          />
        </button>
        <RadioPriority
          id={"radio-priority-item"}
          name={"priority" + this.props.idx}
          value={this.props.item.priority}
          visibility={this.state.show}
          onChange={this.handlePriority}
        />
      </div>
    );
  }
}
export default PriorityBtn;

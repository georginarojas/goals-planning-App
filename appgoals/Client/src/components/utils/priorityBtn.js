import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";

class PriorityBtn extends Component {
  color = (priority) => {
    switch (priority) {
      case "high":
        return "red";
      case "normal":
        return "yellow";
      case "low":
        return "green";
    }
  };
  render() {
    return (
      <div>
        <button>
          <FontAwesomeIcon icon={faCircle} color={this.color(this.props.item.priority)} />
        </button>
      </div>
    );
  }
}
export default PriorityBtn;

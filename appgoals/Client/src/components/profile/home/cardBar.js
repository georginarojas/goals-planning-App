import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import "./card.css";

class CardBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newInput: false,
    };
    this.toggleNew = this.toggleNew.bind(this);
    this.handleInput = this.handleInput.bind(this);
  }

  handleInput(e) {
    this.toggleNew();
    e.stopPropagation();
  }

  toggleNew() {
    this.setState({ newInput: !this.state.newInput });
  }

  render() {
    var visibility = "hide";
    if (this.props.visibility) {
      visibility = "show";
    }
    return (
      <div id={this.props.id} className={visibility}>
        <input placeholder="New goal" />
        <button onClick={this.handleInput}>
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {this.state.newInput ? <input placeholder="Time" /> : null}
      </div>
    );
  }
}
export default CardBar;

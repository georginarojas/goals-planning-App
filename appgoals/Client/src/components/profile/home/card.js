import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

import CardBar from "./cardBar";
import "./card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.toggleCard = this.toggleCard.bind(this);
    this.handleCard = this.handleCard.bind(this);
  }

  handleCard(e) {
    e.preventDefault();
    this.toggleCard();
    e.stopPropagation();
  }
  toggleCard() {
    this.setState({ show: !this.state.show });
  }

  render() {
    var icon = faAngleDown;
    if (this.state.show) {
      icon = faAngleUp;
    }
    console.log("+++ Card bar goal ", this.props);
    return (
      <div>
        <div>
          <button className="card-btn" onMouseDown={this.handleCard}>
            <FontAwesomeIcon icon={icon} size="lg" />
          </button>
        </div>
        <CardBar
          handleCard={this.handleCard}
          visibility={this.state.show}
          id={this.props.id}
          name={this.props.name}
          user={this.props.user}
          props={this.props}
        />
      </div>
    );
  }
}
export default Card;

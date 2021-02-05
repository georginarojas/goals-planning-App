import React, { Component } from "react";
import api from "../../../services/api";

class UpdateGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newTitle: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let value = e.target.value;
    this.setState({ newTitle: value });
  }

  async handleSubmit(e) {
    if (e.key === "Enter" && this.state.newtitle !== "") {
      try {
        let idGoal = this.props.id;
        const response = await api.put(`/goal/${idGoal}`, {
          title: this.state.newTitle,
        });
        if (response !== null) {
          let message = "Update with success";
          console.log(message);
        } else {
          let message = "Failed to update";
          console.log(message);
        }
        this.props.updateTitle(idGoal);
        this.props.toggle(e);
      } catch (error) {
        console.log(error);
      }
    } else {
      let message = "Sorry, input empty";
      console.log(message);
    }
  }

  render() {
    return (
      <div>
        <input
          placeholder={"New title"}
          onChange={this.handleChange}
          name={"newTitle"}
          onKeyPress={this.handleSubmit}
        />
      </div>
    );
  }
}

export default UpdateGoal;

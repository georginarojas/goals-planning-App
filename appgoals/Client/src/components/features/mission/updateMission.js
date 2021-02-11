import React, { Component } from "react";
import api from "../../../services/api";

class UpdateMission extends Component {
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
    if (e.key === "Enter" && this.state.newTitle !== "") {
      try {
        let idMission = this.props.id;
        const response = await api.put(`/mission/${idMission}`, {
          title: this.state.newTitle,
        });
        if (response.data !== null) {
          let message = "Update with success";
          console.log(message);
          this.props.toggleChange(e);
          this.props.updateTitle(idMission);
        } else {
          let message = "Failed to update";
          console.log(message);
        }
      } catch (error) {
        console.log(error);
      }
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

export default UpdateMission;

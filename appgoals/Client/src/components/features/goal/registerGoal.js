import React, { Component } from "react";
import api from "../../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class RegisterGoal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let value = e.target.value;
    this.setState({ title: value });
  }

  async handleSubmit(e) {
    e.preventDefault();
    console.log("Submit ", this.props, this.state.title);
    try {
      const response = await api.post("/goal", {
        title: this.state.title,
        userId: this.props.id,
      });

      if (response !== null) {
        let message = "New goal created with success";
        console.log("message ", message, response.data);
        console.log("message ", message, response.data.data);
        this.props.props.props.history.push(
          `/goal/${response.data.data._id}`
        );
        // this.props.props.props.props.history.push("/goal");
      } else {
        let message = "Was not possible to create a goal";
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    console.log("Register goal ", this.props.props.props);
    return (
      <div>
        <input
          placeholder={this.props.name + " " + "title"}
          name="title"
          onChange={this.handleChange}
          required
        />
        <button onClick={this.handleSubmit}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    );
  }
}

export default RegisterGoal;
import React, { Component } from "react";
import api from "../../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import RadioPriority from "../../utils/radioPriority";

class RegisterTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: null,
      priority: "low",
      completed: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.reset = this.reset.bind(this);
  }

  handleChange(e) {
    // e.preventDefault();
    let value = e.target.value;
    let name = e.target.name;
    this.setState({ [name]: value });
    e.stopPropagation();
  }

  async handleSubmit(e) {
    try {
      const response = await api.post(`/task?userId=${this.props.userId}`, {
        missionId: this.props.missionId,
        item: this.state.task,
        priority: this.state.priority,
        completed: this.state.completed,
      });
      if (response.data !== null) {
        let message = "New task created with success";
        this.props.updateData(this.props.missionId);
        console.log(message);
        this.reset(e);
      } else {
        let message = "Was not possible create the task";
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  reset(e) {
    e.preventDefault();
    e.target.reset();
    this.setState({ task: "", priority: "low", completed: false });
  }

  render() {
    const { priority } = this.state;
    return (
      <div>
        <input
          type="text"
          name="task"
          placeholder={"New task"}
          onChange={this.handleChange}
          required
        />
        <RadioPriority
          id={"radio-priority-list"}
          name={"priority"}
          value={priority}
          onChange={this.handleChange}
          visibility={true}
        />
        <button type="submit" onClick={this.handleSubmit}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    );
  }
}

export default RegisterTask;

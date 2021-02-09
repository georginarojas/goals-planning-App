import React, { Component } from "react";
import api from "../../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

class RegisterMission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newMission: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    let value = e.target.value;
    this.setState({ newMission: value });
  }

  async handleSubmit(e) {
    if (this.state.newMission !== "") {
      try {
        const response = await api.post(`mission?userId=${this.props.userId}`, {
          title: this.state.newMission,
          goalId: this.props.goalId,
        });

        let missionId = response.data.data._id;
        if (response.data !== null) {
          let message = "Mission created with success";
          this.props.updateTitle(this.props.goalId);
          this.props.props.history.push(`/mission/${missionId}`);
        } else {
          let message = "Was not possible created the mission";
        }
      } catch (error) {
        let message = "Error: Server failed";
      }
    }
  }

  render() {
    return (
      <div>
        <input
          name={"newMission"}
          placeholder={"New mission"}
          onChange={this.handleChange}
          required
        />
        <button type="submit" onClick={this.handleSubmit}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    );
  }
}

export default RegisterMission;

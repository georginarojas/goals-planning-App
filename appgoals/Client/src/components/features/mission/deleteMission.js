import React, { Component } from "react";
import api from "../../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

class DeleteMission extends Component {
  constructor(props) {
    super(props);
    this.deleteData = this.deleteData.bind(this);
  }

  async deleteData(e) {
    let missionId = this.props.missionId;
    try {
      const response = await api.delete(`/mission/${missionId}`);
      if (response.data.status === "success") {
        let message = "Delete with success";
        console.log("Delete mission ", response.data.status);
        this.props.updateData(this.props.goalId);
      } else {
        let message = "Was not possible delete the mission";
      }
    } catch (error) {
      let message = "Error: Server failed";
    }
  }

  render() {
    return (
      <div>
        <button onClick={this.deleteData}>
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    );
  }
}

export default DeleteMission;

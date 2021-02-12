import React, { Component } from "react";
import api from "../../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

class DeleteTask extends Component {
  constructor(props) {
    super(props);
    this.deleteData = this.deleteData.bind(this);
  }

  async deleteData(e) {
    try {
      let idTask = this.props.idTask;
      const response = await api.delete(`/task/${idTask}`);
      if (response.data !== null) {
        let message = "Task was delete with success";
        this.props.updateData(this.props.missionId);
        console.log(message);
      } else {
        let message = "Failed to delete the task";
        console.log(message);
      }
    } catch (error) {
      console.log(error);
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

export default DeleteTask;

import React, { Component } from "react";
import api from "../../../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-regular-svg-icons";

class DeleteGoal extends Component {
  constructor(props) {
    super(props);
    this.deleteData = this.deleteData.bind(this);
  }

  async deleteData(e) {
    e.preventDefault();
    try {
      let idGoal = this.props.idGoal;
      const response = await api.delete(`/goal/${idGoal}`);
      if (response !== null) {
        let message = "Delete goal with success";
        console.log(message);
        this.props.update();
      } else {
        let message = "Was no  possible delete the goal";
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
export default DeleteGoal;

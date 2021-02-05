import React, { Component } from "react";
import api from "../../../services/api";

import EditInputGoal from "../goal/editInput";

class GetMissions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      missions: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    let idGoal = this.props.idGoal;
    this.fetchData(idGoal);
  }

  async fetchData(idGoal) {
    try {
      let response = await api.get(`/goal/${idGoal}`);
      let title = response.data.data[0].title;
      let missions = response.data.data[0].missions;
      this.setState({ title, missions });
    } catch (error) {
      let message = "Error: Server failed";
      console.log(message);
    }
  }

  render() {
    // console.log("TITLE GOAL ", this.state.title, this.state.missions);
    const { missions } = this.state;
    const missionList = missions.map((mission, i) => {
      return (
        <li key={i + 1}>
          <p>{mission.title}</p>
        </li>
      );
    });
    return (
      <div>
        <h2>{this.state.title}</h2>
        <EditInputGoal id={this.props.idGoal} updateTitle={this.fetchData} />
        <div>
          <h3>Missions: </h3>
          <ul>{missionList}</ul>
        </div>
      </div>
    );
  }
}

export default GetMissions;

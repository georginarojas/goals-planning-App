import React, { Component } from "react";
import api from "../../services/api";

import { isLogin, intervalTime } from "../../components/config/verifyAuth";
import Header from "../../components/utils/header";
import GetTasks from "../../components/features/task/getTasks";
import RegisterTask from "../../components/features/task/registerTask";

class Mission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      tasks: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    let time = intervalTime(); // milliseconds
    this.timerId = setInterval(() => {
      isLogin(this.props);
    }, time);
    let missionId = this.props.match.params.idMission;
    this.fetchData(missionId);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  async fetchData(missionId) {
    try {
      const response = await api.get(`/mission/${missionId}`);
      if (response.data !== null) {
        this.setState({ title: response.data.data[0].title });
        this.setState({ tasks: response.data.data[0].tasks });
      } else {
        let message = "Was not to load the mission";
        console.log(message);
      }
    } catch (error) {
      let message = "Error: Server failed";
      console.log(message);
    }
  }

  render() {
    const user = JSON.parse(localStorage.getItem("User"));
    const userId = user._id;

    return (
      <div>
        <Header />
        <h2>{this.state.title}</h2>
        <RegisterTask
          userId={userId}
          missionId={this.props.match.params.idMission}
          updateData={this.fetchData}
        />
        <GetTasks tasks={this.state.tasks} />
      </div>
    );
  }
}

export default Mission;

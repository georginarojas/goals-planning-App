import React, { Component } from "react";
import api from "../../services/api";

import { isLogin, intervalTime } from "../../components/config/verifyAuth";
import Header from "../../components/utils/header";
import MissionsList from "../../components/features/mission/missionsList";
import EditInputGoal from "../../components/features/goal/editInput";

import RegisterMission from "../../components/features/mission/registerMission";

import GoHome from "../../components/utils/goHome";
import GoBack from "../../components/utils/goBack";
import Logout from "../../components/utils/logout";

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      missions: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }
  componentDidMount() {
    let time = intervalTime(); // milliseconds
    this.timerId = setInterval(() => {
      isLogin(this.props);
    }, time);
    let idGoal = this.props.match.params.idGoal;
    this.fetchData(idGoal);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
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
    const user = JSON.parse(localStorage.getItem("User"));
    const userId = user._id;
    return (
      <div>
        <Header />
        <GoBack />
        <GoHome id={userId} />
        <Logout />

        <h2>{this.state.title}</h2>
        <EditInputGoal
          id={this.props.match.params.idGoal}
          updateTitle={this.fetchData}
        />
        <RegisterMission
          userId={userId}
          goalId={this.props.match.params.idGoal}
          updateTitle={this.fetchData}
          props={this.props}
        />
        <MissionsList
          missions={this.state.missions}
          goalId={this.props.match.params.idGoal}
          updateData={this.fetchData}
        />
      </div>
    );
  }
}
export default Goal;

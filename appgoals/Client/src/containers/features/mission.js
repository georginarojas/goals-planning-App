import React, { Component } from "react";
import api from "../../services/api";

import { isLogin, intervalTime } from "../../components/config/verifyAuth";
import Header from "../../components/utils/header";
import GetTask from "../../components/features/task/getTasks";

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
    let missionId = this.props.match.params.id;
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
      }
    } catch (error) {
      let message = "Error: Server failed";
    }
  }

  render() {
    return (
      <div>
        <Header />
        <h2>{this.state.title}</h2>
        <GetTask tasks={this.state.tasks} />
      </div>
    );
  }
}

export default Mission;

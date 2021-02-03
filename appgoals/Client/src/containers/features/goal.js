import React, { Component } from "react";

import { isLogin, intervalTime } from "../../components/config/verifyAuth";
import Header from "../../components/utils/header";
import GetMissions from "../../components/features/mission/getMissions";

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleGoal: null,
      idGoal: null,
    };
  }
  componentDidMount() {
    let time = intervalTime(); // milliseconds
    console.log("Goal props ", this.props, time);
    this.timerId = setInterval(() => {
      isLogin(this.props);
    }, time);
  }

  componentWillUnmount() {
    console.log("Goal clearInterval");
    clearInterval(this.timerId);
  }

  render() {
    console.log("Goal ", this.props.match.params.idGoal);
    return (
      <div>
        <Header />
        <GetMissions idGoal={this.props.match.params.idGoal} />
      </div>
    );
  }
}
export default Goal;

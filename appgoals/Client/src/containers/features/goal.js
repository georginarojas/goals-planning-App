import React, { Component } from "react";
import api from "../../services/api";

import { isLogin, intervalTime } from "../../components/config/verifyAuth";
import Header from "../../components/utils/header";
import TitleGoal from "../../components/features/list/titleGoal";

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

  //   async fetchData(){
  //     let idGoal = this.props.match.params.idGoal;

  //       const response = await api.get("/goal", {
  //           params:
  //       })
  //   }

  render() {
    console.log("Goal ", this.props.match.params.idGoal);
    return (
      <div>
        <Header />
        <TitleGoal idGoal={this.props.match.params.idGoal} />
      </div>
    );
  }
}
export default Goal;

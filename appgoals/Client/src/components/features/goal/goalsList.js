import React, { Component } from "react";
import api from "../../../services/api";

import DeleteGoal from "./deleteGoal";
import GoButton from "../../utils/goBtn";

class GoalsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goals: [],
    };
    this.fetchData = this.fetchData.bind(this);
  }

  componentDidMount() {
    this.fetchData(this.props.props.props.match.params.id);
  }

  async fetchData(userId) {
    let jwt = localStorage.getItem("JWT");
    try {
      const response = await api.get(`/user/${userId}`, {
        params: { userId },
        headers: { Authorization: `JWT ${jwt}` },
      });
      if (response.data !== null) {
        let goals = response.data.data[0].goals;
        this.setState({ goals });
      } else {
        let message = "Was not possible find the goals";
        console.log(message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { goals } = this.state;
    const goalList = goals.map((goal, i) => {
      return (
        <li key={i + 1}>
          <p>{goal.title}</p>
          <GoButton url={`/goal/${goal._id}`} />
          <DeleteGoal idGoal={goal._id} update={this.fetchData} />
        </li>
      );
    });
    return (
      <div>
        <p>Goals:</p>
        <ul>{goalList}</ul>
      </div>
    );
  }
}

export default GoalsList;

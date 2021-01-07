import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ConfigProfile extends Component {
  componentDidMount() {
    const auth = localStorage.getItem("Auth");
    if (auth) {
      const user = JSON.parse(localStorage.getItem("User"));
      this.props.setContext({ auth, user });
    } else {
      this.props.history.push("/login");
    }
  }

  render() {
    console.log("USER ", this.props);
    return (
      <div className="config-profile">
        <h1>CONFIG PROFILE</h1>
        <ul>
          <li>Name: {this.props.user.name}</li>
          <li>User name: {this.props.user.username}</li>
        </ul>
      </div>
    );
  }
}

export default withRouter(ConfigProfile);

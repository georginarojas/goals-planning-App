import React, { Component } from "react";
import Header from "../../utils/header";

class HomeProfile extends Component {
  componentDidMount() {
    const jwt = localStorage.getItem("JWT");
    console.log("Home ", jwt);
    const {
      match: {
        params: { userId },
      },
    } = this.props;
    console.log("Home id ", userId);
    console.log(this.props);
  }

  render() {
    return (
      <div className="home">
        <Header />
        <br />
        <p>Home Profile</p>
      </div>
    );
  }
}

export default HomeProfile;

import React, { Component } from "react";
import Header from "../../utils/header";
import { Link, withRouter } from "react-router-dom";

import VerifyAuth from "../../components/config/verifyAuth";
import Logout from "../../components/utils/logout";

class HomeProfile extends Component {
  render() {
    // console.log("HOME props", this.props);
    return (
      <div className="home">
        <Header />
        <br />
        <p>Home Profile</p>

        <VerifyAuth props={this.props} />

        <Link to="/profile">Data user</Link>

        <div>
          <Logout />
        </div>
      </div>
    );
  }
}

export default withRouter(HomeProfile);

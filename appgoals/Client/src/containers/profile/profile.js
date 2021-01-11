import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import VerifyAuth from "../../components/config/verifyAuth";
import Header from "../../utils/header";
import Logout from "../../components/config/logout";
import "../userRegister/form.scss";

class Profile extends Component {
  render() {
    // console.log("USER ", this.props);

    return (
      <div className="config-profile">
        <VerifyAuth props={this.props} />
        <Header />
        <form>
          <h3>Profile</h3>

          <div className="list">
            <ul>
              <li>
                <label>Name: {this.props.user.name}</label>
              </li>
              <li>User name: {this.props.user.username}</li>
              <li>Email: {this.props.user.email}</li>
              <li>Gender: {this.props.user.gender}</li>
              <li>Birthdate: {this.props.user.birthdate}</li>
            </ul>
          </div>
          <div>
            <Link to="/profile/edit">
              <button
                type="button"
                // onClick={(e) => {
                // e.preventDefault();
                // this.props.history.push("/profile/edit");
                // // window.location.href = "http://google.com";
                // }}
              >
                Edit
              </button>
            </Link>
          </div>
        </form>

        <div>
          <Logout />
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);

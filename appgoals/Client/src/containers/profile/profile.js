import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import { format } from "date-fns";

import VerifyAuth from "../../components/config/verifyAuth";
import Header from "../../utils/header";
import Logout from "../../components/config/logout";
import GoHome from "../../components/config/goHome";
import GoBack from "../../components/config/goBack";

import "../userRegister/form.scss";

class Profile extends Component {
  render() {
    console.log("PROFILE DATE ", this.props.user.birthdate);
    const value = this.props.user.birthdate.toString();
    var d = new Date(value);
    const formattedDate = format(d, "dd/MM/yyyy");
    console.log(formattedDate);

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
              <li>Birthdate: {formattedDate}</li>
            </ul>
          </div>
          <div>
            <Link to="/profile/edit">
              <button type="button">Edit</button>
            </Link>
          </div>
        </form>

        <div>
          <Logout />
        </div>
        <div>
          <GoHome />
        </div>
        <div>
          <GoBack />
        </div>

      </div>
    );
  }
}

export default withRouter(Profile);

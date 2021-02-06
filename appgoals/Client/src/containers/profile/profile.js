import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import { format } from "date-fns";

import Header from "../../components/utils/header";
import Logout from "../../components/utils/logout";
import GoHome from "../../components/utils/goHome";
import GoBack from "../../components/utils/goBack";
import EditBtnLink from "../../components/utils/editBtnLink";
import { isLogin, intervalTime } from "../../components/config/verifyAuth";

import "../userRegister/form.scss";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthdate: "",
    };
    this.handleData = this.handleData.bind(this);
  }
  componentDidMount() {
    const user = JSON.parse(localStorage.getItem("User"));
    this.handleData(user.birthdate);

    let time = intervalTime(); // milliseconds
    console.log("home props ", this.props, time);
    this.timerId = setInterval(() => {
      isLogin(this.props);
    }, time);
  }

  componentWillUnmount() {
    console.log("Home clearInterval");
    clearInterval(this.timerId);
  }

  handleData(data) {
    this.setState({ birthdate: data });
  }

  render() {
    const { birthdate } = this.state;
    console.log("Profile birthdate ", birthdate);
    if (birthdate !== "") {
      const value = birthdate.toString();
      var d = new Date(value);
      var formattedDate = format(d, "dd/MM/yyyy");
    }

    return (
      <div className="config-profile">
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
          <div className="profile-editBtn">
            <EditBtnLink url={`/profile/${this.props.user._id}/edit`} />
          </div>
        </form>

        <div className="profile-goal"></div>

        <div>
          <Logout />
        </div>
        <div>
          <GoHome id={this.props.user._id}/>
        </div>
        <div>
          <GoBack />
        </div>
      </div>
    );
  }
}

export default withRouter(Profile);

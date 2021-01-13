import React, { Component } from "react";
import { withRouter, Link } from "react-router-dom";

import { format } from "date-fns";

import VerifyAuth from "../../components/config/verifyAuth";
import Header from "../../utils/header";
import Logout from "../../components/utils/logout";
import GoHome from "../../components/utils/goHome";
import GoBack from "../../components/utils/goBack";

import "../userRegister/form.scss";

class Profile extends Component {
  constructor(props){
    super(props);
    this.state={
      birthdate:"",
    }
    this.handleData = this.handleData.bind(this);
  }
  componentDidMount(){
    const user = JSON.parse(localStorage.getItem("User"));
    this.handleData(user.birthdate);
  }

  handleData(data){
    this.setState({birthdate: data});
  }

  render() {
    const {birthdate} = this.state;
    console.log("Profile birthdate ", birthdate);
    if(birthdate !== ""){
      const value = birthdate.toString();
      var d = new Date(value);
      var formattedDate = format(d, "dd/MM/yyyy");
    }

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

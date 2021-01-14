import React, { Component } from "react";
import Header from "../../utils/header";
import { withRouter } from "react-router-dom";

import VerifyAuth from "../../components/config/verifyAuth";
import Logout from "../../components/utils/logout";
import MenuBtn from "../../components/utils/menuBtn";
import Menu from "../../components/profile/home/menu";

class HomeProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu(event) {
    console.log(">>> Home Menu");
    this.toggleMenu(event);
    event.stopPropagation();
  }

  toggleMenu() {
    this.setState({ show: !this.state.show });
  }

  render() {
    console.log("HOME show", this.state.show);
    return (
      <div className="home">
        <div>
          <Header />
          <MenuBtn handleMenu={this.handleMenu} />
          <VerifyAuth props={this.props} />
        </div>
        <div className="menu-bar">
          <Menu handleMenu={this.handleMenu} menuVisibility={this.state.show} />
        </div>
          <br />
          <p>Home Profile</p>
         
        <div>
          <Logout />
        </div>
      </div>
    );
  }
}

export default withRouter(HomeProfile);

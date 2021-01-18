import React, { Component } from "react";
import Header from "../../components/utils/header";
import { withRouter } from "react-router-dom";

import VerifyAuth from "../../components/config/verifyAuth";
import Logout from "../../components/utils/logout";
import Menu from "../../components/profile/home/menu";
import Card from "../../components/profile/home/card";

class HomeProfile extends Component {
  render() {
    return (
      <div className="home">
        <VerifyAuth props={this.props} />
        <Header />

        <div>
          <Logout />
        </div>

        <Menu />

        <main>
          <section>
            <h1>Wellcome </h1>
          </section>

          <section>
            <div id="card">
              <h3>Goals</h3>
              <Card id={"card-goals"} name={"Goal"}/>
            </div>
            <div id="card">
              <h3>Tasks</h3>
              <Card id={"card-tasks"} name={"Task"}/>
            </div>
            <div id="card">
              <h3>List</h3>
              <Card id={"card-list"} name={"List"}/>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default withRouter(HomeProfile);

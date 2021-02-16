import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import {
  isLogin,
  intervalTime,
  setContextAuth,
} from "../../components/config/verifyAuth";

import Header from "../../components/utils/header";
import Logout from "../../components/utils/logout";
import Menu from "../../components/utils/menu/menu";
import Card from "../../components/utils/card/card";

class HomeProfile extends Component {
  componentDidMount() {
    setContextAuth(this.props);

    let time = intervalTime(); // milliseconds
    this.timerId = setInterval(() => {
      isLogin(this.props);
    }, time);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div className="home">
        <Header />

        <div>
          <Logout />
        </div>

        <Menu id={this.props.user._id} />

        <main>
          <section>
            <h1>Wellcome </h1>
          </section>

          <section>
            <div id="card">
              <h3>Goals</h3>
              <Card
                id={"card-data"}
                name={"Goal"}
                dataId={this.props.user._id}
                props={this.props}
              />
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default withRouter(HomeProfile);

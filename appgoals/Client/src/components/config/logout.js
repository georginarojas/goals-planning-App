import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      close: false,
    };

    this.logout = this.logout.bind(this);
  }

  logout = () => {
    localStorage.clear();
    this.setState({ close: true });
  };

  render() {
    if (this.state.close) {
      return <Redirect to="/" push={true} />;
    }
    return (
      <div>
        <button onClick={this.logout} className="button-profile">
          Log Out
        </button>
      </div>
    );
  }
}

export default Logout;

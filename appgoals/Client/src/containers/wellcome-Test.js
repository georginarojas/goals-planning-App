import React, { Component } from "react";
import { Link } from "react-router-dom";

import Header from "../utils/header/";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <Header />
        <br />
        <p>To wellcome...</p>
        <br />
        <Link to="/register">Go to register</Link>
        <br />
        <Link to="/login">Go to login</Link>
      </div>
    );
  }
}

export default Home;

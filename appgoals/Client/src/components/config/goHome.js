import React, { Component } from "react";
import { Link } from "react-router-dom";

class GoHome extends Component {
  render() {
    return (
      <div>
        <Link to="/home">
          <button type="button" className="button-goHome">
           Go Home
          </button>
        </Link>
      </div>
    );
  }
}

export default GoHome;

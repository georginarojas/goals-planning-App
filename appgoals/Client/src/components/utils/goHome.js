import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

class GoHome extends Component {
  render() {
    const {id} = this.props;
    return (
      <div >
        <Link to={`/home/${id}`}>
          <button type="button" className="utils-button">
            <FontAwesomeIcon icon={faHome} color="blue" size="lg" />
          </button>
        </Link>
      </div>
    );
  }
}

export default GoHome;

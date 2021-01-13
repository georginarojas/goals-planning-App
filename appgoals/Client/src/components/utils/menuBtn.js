import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

class MenuBtn extends Component {
  render() {
    return (
      <div>
        <button className="menu-btn" onMouseDown={this.props.handleMenu}>
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    );
  }
}

export default MenuBtn;

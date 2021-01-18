import React, { Component } from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import MenuLinks from "./menuLinks";

import "./menu.css";

class MenuBar extends Component {
  render() {
    var visibility = "hide";
    if (this.props.menuVisibility) {
      visibility = "show";
    }
    return (
      <div id="menu" className={visibility}>
        <button onClick={this.props.handleMenu}>
            <FontAwesomeIcon icon={faTimes} />
        </button>
        <MenuLinks />
      </div>
    );
  }
}
export default MenuBar;

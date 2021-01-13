import React, { Component } from "react";

import "./menu.css";

class Menu extends Component {
  render() {
    var visibility = "hide";
    if (this.props.menuVisibility) {
      console.log("Menu ", this.props.menuVisibility);
      visibility = "show";
    }
    console.log("Menu show ", visibility);
    return (
      <div id="menu" onMouseDown={this.props.handleMenu} className={visibility}>
        <h2>
          <a href="#">Home</a>
        </h2>
        {/* <h2>
          <a href="#">About</a>
        </h2>
        <h2>
          <a href="#">Contact</a>
        </h2>
        <h2>
          <a href="#">Search</a>
        </h2> */}
      </div>
    );
  }
}
export default Menu;

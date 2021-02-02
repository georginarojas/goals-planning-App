import React, { Component } from "react";

import MenuBtn from "../../utils/menuBtn";
import MenuBar from "./menuBar";

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.toggleMenu = this.toggleMenu.bind(this);
    this.handleMenu = this.handleMenu.bind(this);
  }

  handleMenu(event) {
    event.preventDefault();
    this.toggleMenu(event);
    event.stopPropagation();
  }

  toggleMenu() {
    this.setState({ show: !this.state.show });
  }

  render() {
    return (
      <div>
        <div>
          <MenuBtn handleMenu={this.handleMenu} />
        </div>

        <MenuBar
          handleMenu={this.handleMenu}
          menuVisibility={this.state.show}
          id={this.props.id}
        />
      </div>
    );
  }
}

export default Menu;

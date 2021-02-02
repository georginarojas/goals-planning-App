import React, { Component } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import MenuLinks from "./menuLinks";

import "./menu.css";

const MenuBar = (props) => {
  var visibility = "hide";
  if (props.menuVisibility) {
    visibility = "show";
  }
  return (
    <div id="menu" className={visibility}>
      <button onClick={props.handleMenu}>
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <MenuLinks id={props.id} />
    </div>
  );
};
export default MenuBar;

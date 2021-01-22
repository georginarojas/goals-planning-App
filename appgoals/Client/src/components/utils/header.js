import React from "react";
import "./header.css";

import logo from "../../utils/images/logo.png";

const Header = () => (
  <div id="header-logo">
    <img  src={logo} alt="Logo" />
    <header >Planner</header>
  </div>
);

export default Header;

import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faEdit } from "@fortawesome/free-solid-svg-icons";

import "./menu.css";

class MenuLinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: [
        {
          text: "Home",
          link: "/home",
          icon: faHome,
        },
        {
          text: "Profile",
          link: "/profile",
          icon: faUser,
        },
        {
          text: "About",
          link: "/",
          icon: faEdit,
        },
      ],
    };
  }
  render() {
    const links = this.state.links.map((link, i) => (
      <li key={i + 1}>
        <FontAwesomeIcon className="menu-icon" icon={link.icon} />
        <Link to={link.link} className="link" >
          {link.text}
        </Link>
      </li>
    ));
    return (
      <div id="menu-links">
        <ul>{links}</ul>
      </div>
    );
  }
}
export default MenuLinks;

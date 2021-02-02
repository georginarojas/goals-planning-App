import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHome, faEdit } from "@fortawesome/free-solid-svg-icons";

import "./menu.css";

const MenuLinks = (props) => {
  let home = `/home/${props.id}`,
    profile = `/profile/${props.id}`,
    index = "/";

  const linksMenu = [
    {
      text: "Home",
      link: home,
      icon: faHome,
    },
    {
      text: "Profile",
      link: profile,
      icon: faUser,
    },
    {
      text: "About",
      link: index,
      icon: faEdit,
    },
  ];

  const links = linksMenu.map((link, i) => {
    return (
      <li key={i + 1}>
        <FontAwesomeIcon className="menu-icon" icon={link.icon} />
        <Link to={link.link} className="link">
          {link.text}
        </Link>
      </li>
    );
  });

  return (
    <div id="menu-links">
      <ul>{links}</ul>
    </div>
  );
};
export default MenuLinks;
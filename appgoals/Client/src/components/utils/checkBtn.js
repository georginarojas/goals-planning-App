import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquare, faCheckSquare} from "@fortawesome/free-regular-svg-icons";

const CheckButton = (props) => {
  return (
    <div className="check-button">
      {props.isCheck ? (
        <FontAwesomeIcon icon={faCheckSquare} />
      ) : (
        <FontAwesomeIcon icon={faSquare} />
      )}
    </div>
  );
};

export default CheckButton;

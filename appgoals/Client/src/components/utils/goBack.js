import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function GoBack() {
  const history = useHistory();
  return (
    <div >
      <button
        type="button"
        className="utils-button"
        onClick={() => {
          history.goBack();
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
      </button>
    </div>
  );
}

export default GoBack;

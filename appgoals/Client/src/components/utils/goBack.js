import React from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

function GoBack() {
  const history = useHistory();
  return (
    <div className="utils-button">
      <button
        type="button"
        className="button-goBack"
        onClick={() => {
          history.goBack();
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
      </button>
    </div>
  );
}

export default GoBack;

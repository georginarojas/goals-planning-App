import React from "react";
import { useHistory } from "react-router-dom";

  function GoBack(){
    const history = useHistory();
    return (
      <div>
          <button
            type="button"
            className="button-goBack"
            onClick={() => {
              history.goBack();
            }}
          >
            Go back
          </button>
      </div>
    );
}

export default GoBack;

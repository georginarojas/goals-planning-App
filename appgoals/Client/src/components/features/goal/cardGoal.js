import React from "react";

import RegisterGoal from "./registerGoal";
import GetGoals from "./getGoals";
import "../../utils/card/card.css";

const CardGoal = (props) => {
  var visibility = "hide";
  if (props.visibility) {
    visibility = "show";
  }
  return (
    <div id={props.id} className={visibility}>
      <RegisterGoal
        id={props.dataId}
        name={props.name}
        props={props.props}
      />
      <GetGoals id={props.dataId} />
    </div>
  );
};
export default CardGoal;

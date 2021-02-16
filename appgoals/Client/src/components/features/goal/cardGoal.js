import React from "react";

import RegisterGoal from "./registerGoal";
import GoalsList from "./goalsList";
import "../../utils/card/card.css";

const CardGoal = (props) => {
  var visibility = "hide";
  if (props.visibility) {
    visibility = "show";
  }
  return (
    <div id={props.id} className={visibility}>
      <RegisterGoal id={props.dataId} name={props.name} props={props.props} />
      <GoalsList id={props.dataId} props={props.props} />
    </div>
  );
};
export default CardGoal;

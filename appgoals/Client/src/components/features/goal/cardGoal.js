import React from "react";

import RegisterGoal from "./registerGoal";
import GetGoals from "./getGoals";
import "../../utils/card/card.css";

const CardGoal = (props) => {
  console.log("#### Card bar GOALS PROPS ", props);
  var visibility = "hide";
  if (props.visibility) {
    visibility = "show";
  }
  return (
    <div id={props.id} className={visibility}>
      <RegisterGoal id={props.user._id} name={props.name} props={props.props} />
      <GetGoals id={props.user._id} />
    </div>
  );
};
export default CardGoal;

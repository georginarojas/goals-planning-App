import React from "react";

import CardGoal from "../../features/goal/cardGoal";
import "./card.css";

const CardBar = (props) => {
  console.log("Card bar ", props);
  return (
    <div >
      <CardGoal
        visibility={props.visibility}
        id={props.id}
        name={props.name}
        user={props.user}
        props={props.props}
      />
    </div>
  );
};
export default CardBar;

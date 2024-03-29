import React from "react";

import CardGoal from "../../features/goal/cardGoal";
import "./card.css";

const CardBar = (props) => {
  const renderSwitch = (params) => {
    switch (params) {
      case "Goal":
        return (
          <CardGoal
            visibility={props.visibility}
            id={props.id}
            name={props.name}
            dataId={props.dataId}
            props={props.props}
          />
        );
      case "Mission":
        return <h3>Test</h3>;
      default:
        return <h3>default</h3>;
    }
  };

  return <div>{renderSwitch(props.name)}</div>;
};
export default CardBar;

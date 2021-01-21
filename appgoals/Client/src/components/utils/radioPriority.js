import React from "react";

const RadioPriority = (props) => {
  return (
    <div id={props.id} name={props.name} value={props.value}>
        <input
          type="radio"
          value="high"
          name={props.name}
          onChange={props.onChange}
        />{" "}
        High
      <input
        type="radio"
        value="medium"
        name={props.name}
        onChange={props.onChange}
      />{" "}
      Medium
      <input
        type="radio"
        value="low"
        name={props.name}
        onChange={props.onChange}
        checked={props.value === "low" ? true : false}
      />{" "}
      Low
    </div>
  );
};
export default RadioPriority;

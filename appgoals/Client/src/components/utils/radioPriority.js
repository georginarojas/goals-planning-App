import React from "react";

import "./radioPriority.css";

const RadioPriority = (props) => {
  let visibility = "hide";
  if (props.visibility) {
    visibility = "show";
  }
  console.log(
    "RADIO Id, className, visibility value ",
    props.id,
    props.name,
    visibility,
    props.value
  );
  return (
    <div
      id={props.id}
      name={props.name}
      value={props.value}
      className={visibility}
    >
      <input
        type="radio"
        value="high"
        name={props.name}
        onChange={props.onChange}
        checked={props.value === "high" ? true : false}
      />{" "}
      High
      <input
        type="radio"
        value="medium"
        name={props.name}
        onChange={props.onChange}
        checked={props.value === "medium" ? true : false}
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

import React from "react";

const SelectPriority = (props) => {
  return (
    <label>
      Priority:
      <select
        id={props.id}
        value={props.value}
        onChange={props.onChange}
        name={props.name}
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </label>
  );
};
export default SelectPriority;

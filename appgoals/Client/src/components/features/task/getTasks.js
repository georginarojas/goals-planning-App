import React from "react";

const GetTask = (props) => {
  const taskList = props.tasks.map((task, i) => {
    return (
      <li key={i + 1}>
        <div>
          <p>{task.title}</p>
        </div>
      </li>
    );
  });
  return (
    <div>
      <h4>Tasks: </h4>
      <ul>{taskList}</ul>
    </div>
  );
};
export default GetTask;

import React from "react";
import Task from "./task";

const TasksList = (props) => {
  let listTask = props.tasks;
  const listTasks = listTask.map((task, i) => {
    return (
      <Task
        task={task}
        key={i}
        listTask={listTask}
        idx={i}
        updateTaskList={props.updateTaskList}
        completeTask={props.completeTask}
        updateData={props.updateData}
      />
    );
  });

  return (
    <div>
      <ul>{listTasks}</ul>
    </div>
  );
};

export default TasksList;

import React, { Component } from "react";

import CheckButton from "../../utils/checkBtn";
import PriorityBtn from "../../utils/priorityBtn";
import DeleteTask from "./delete";

class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditTask: false,
    };
    this.toggleEditTask = this.toggleEditTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  toggleEditTask(e) {
    e.preventDefault();
    this.setState({ isEditTask: true });
    e.stopPropagation();
  }

  handleChange(e) {
    e.preventDefault();
    if (e.key === "Enter") {
      let value = e.target.value;
      let tasks = this.props.tasks;
      let idx = this.props.idx;
      tasks[idx].item = value;
      this.props.updateTaskList(tasks);
      this.setState({ isEditTask: true });
    }
  }

  markDone = () => {
    let currentTask = this.props.task._id;
    this.props.completeTask(currentTask);
  };

  render() {
    const { completed, item } = this.props.task;
    const { isEdtiItem } = this.state;
    return (
      <div>
        <span onClick={this.markDone}>
          <CheckButton isCheck={completed} />
        </span>
        <span onClick={this.toggleEditTask}>
          {isEdtiItem ? (
            <input
              type="text"
              placeholder="Edit task"
              name="task"
              onKeyPress={this.handleChange}
              autoFocus
              required
            />
          ) : (
            <p>{item}</p>
          )}
        </span>
        <DeleteTask
          idTask={this.props.task._id}
          missionId={this.props.task.missionId}
          updateData={this.props.updateData}
        />
        <PriorityBtn
          item={this.props.task}
          list={this.props.listTask}
          idx={this.props.idx}
          updateList={this.props.updateTaskList}
        />
      </div>
    );
  }
}

export default Task;

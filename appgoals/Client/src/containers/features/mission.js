import React, { Component } from "react";
import api from "../../services/api";

import { isLogin, intervalTime } from "../../components/config/verifyAuth";
import Header from "../../components/utils/header";
// import TasksList from "../../components/features/task/tasksList";
import RegisterTask from "../../components/features/task/registerTask";
import ItemStats from "../../components/utils/itemStats";

import TasksList from "../../components/features/task/tasksList";
import EditInputMission from "../../components/features/mission/editInput";

class Mission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      tasks: [],
      finished: 0,
      percentDone: 0,
    };
    this.fetchData = this.fetchData.bind(this);

    this.completedTask = this.completedTask.bind(this);
    this.updateTaskList = this.updateTaskList.bind(this);
    this.handleSubmitTask = this.handleSubmitTask.bind(this);
  }

  componentDidMount() {
    let time = intervalTime(); // milliseconds
    this.timerId = setInterval(() => {
      isLogin(this.props);
    }, time);
    let missionId = this.props.match.params.idMission;
    this.fetchData(missionId);
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  async fetchData(missionId) {
    try {
      const response = await api.get(`/mission/${missionId}`);
      if (response.data !== null) {
        this.setState({ title: response.data.data[0].title });
        this.setState({ tasks: response.data.data[0].tasks });
        this.countFinishedItems();
      } else {
        let message = "Was not to load the mission";
        console.log(message);
      }
    } catch (error) {
      let message = "Error: Server failed";
      console.log(message);
    }
  }

  countFinishedItems() {
    let list = this.state.tasks;
    let finished = list.reduce((prev, curr) => {
      return curr.completed ? prev + 1 : prev;
    }, 0);
    this.setState({ finished }, () => {
      this.percentCompletion();
    });
  }

  percentCompletion() {
    let totalItems = this.state.tasks.length,
      finishedItems = this.state.finished,
      percentDone = Math.floor((finishedItems / totalItems) * 100);
    percentDone = isNaN(percentDone) ? 0 : percentDone;
    this.setState({ percentDone });
  }

  //-----------------------------------

  completedTask(currentTask) {
    let list = this.state.tasks;
    for (let i = 0; i < list.length; i++) {
      if (list[i]._id === currentTask) {
        list[i].completed = !list[i].completed;
        break;
      }
    }
    this.setState({ tasks: list });
  }

  updateTaskList(list) {
    this.setState({ tasks: list });
  }

   handleSubmitTask(e) {
    let list = this.state.tasks;
    console.log("LIST ", list);
    list.map(async (task, i) => {
      try {
        console.log(">>> TASK ", task)
        const response = await api.put(`/task/${task._id}`, {
          item: task.item,
          priority: task.priority,
          completed: task.completed,
        });
        if (response.data !== null) {
          let message = "Update with success";
          console.log(message, i);
        } else {
          let message = "Was not possible the update task";
          console.log(message, i);
        }
      } catch (error) {
      console.log(error);
      }
    });
  }

  //-----------------------------------

  render() {
    const user = JSON.parse(localStorage.getItem("User"));
    const userId = user._id;
    const { tasks, percentDone, finished } = this.state;
    return (
      <div>
        <Header />
        <h2>{this.state.title}</h2>
        <EditInputMission
          id={this.props.match.params.idMission}
          updateTitle={this.fetchData}
        />
        <ItemStats list={tasks} finished={finished} percentDone={percentDone} />
        <RegisterTask
          userId={userId}
          missionId={this.props.match.params.idMission}
          updateData={this.fetchData}
        />

        <TasksList
          tasks={tasks}
          updateTaskList={this.updateTaskList}
          completeTask={this.completedTask}
          updateData={this.fetchData}
        />
        <button type="submit" onClick={this.handleSubmitTask}>
          Save
        </button>
      </div>
    );
  }
}

export default Mission;

const mongoose = require("mongoose");

const TaskListScheme = new mongoose.Schema(
  {
    todoList: [
      {
        item: {
          type: String,
          required: true,
        },
        completed: {
          type: Boolean,
          required: true,
        },
        priority: {
          type: String,
        },
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    missionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
    },
  },
  { timestamps: true }
);

mongoose.model("TaskList", TaskListScheme);

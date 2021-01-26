const mongoose = require("mongoose");

const TaskScheme = new mongoose.Schema(
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
    missionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
      required: true,
    },
  },
  { timestamps: true }
);

mongoose.model("Task", TaskScheme);

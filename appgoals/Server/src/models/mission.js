const mongoose = require("mongoose");

const MissionScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
      required: true,
    },
  },
  { timestamps: true }
);

MissionScheme.pre(
  "remove",
  { query: true, document: false },
  async function (next) {
    const id = this._conditions._id;
    const tasks = await mongoose.model("Task").find({ missionId: id });
    tasks.map(async (task, i) => {
      const response = await mongoose
        .model("Task")
        .remove({ _id: task._id })
        .exec();
    });
    next();
  }
);

mongoose.model("Mission", MissionScheme);

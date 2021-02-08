const mongoose = require("mongoose");
// const Mission = mongoose.model("Mission");

const GoalScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

GoalScheme.pre(
  "remove",
  { query: true, document: false },
  async function (next) {
    const id = this._conditions._id;
    const missions = await mongoose.model("Mission").find({ goalId: id });

    missions.map(async (mission, i) => {
      const response = await mongoose
        .model("Mission")
        .remove({ _id: mission._id })
        .exec();
    });
    next();
  }
);

mongoose.model("Goal", GoalScheme);

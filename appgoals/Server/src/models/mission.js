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

mongoose.model("Mission", MissionScheme);

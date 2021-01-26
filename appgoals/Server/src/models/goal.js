const mongoose = require("mongoose");

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

mongoose.model('Goal', GoalScheme);

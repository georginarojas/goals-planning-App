const mongoose = require("mongoose");
const Task = require("./task");


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

MissionScheme.pre('remove',  { query: true, document: false }, async function(next){
  const id= this._conditions._id;
  await mongoose.model("Task").remove({ missionId: id}).exec();
  next();
});

mongoose.model("Mission", MissionScheme);

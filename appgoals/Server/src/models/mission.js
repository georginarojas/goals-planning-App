const mongoose = require("mongoose");

const MissionScheme = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    goalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Goal",
    },
  },
  { timestamps: true }
);

mongoose.model("Mission", MissionScheme);

// {
//     "_id" : ObjectId("600dfe3ec740f255b8f116f3"),
//     "title" : "Work out 5",
//     "userId" : ObjectId("5fd95ca235ecdf5994b5edfb"),
//     "createdAt" : ISODate("2021-01-24T23:09:50.391Z"),
//     "updatedAt" : ISODate("2021-01-24T23:09:50.391Z"),
//     "__v" : 0
// }

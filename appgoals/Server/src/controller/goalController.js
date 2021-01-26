const mongoose = require("mongoose");
const Goal = mongoose.model("Goal");

module.exports = {
  //*********************//
  //------- Index -------//
  //*********************//
  async index(req, res) {
    try {
      const goals = await Goal.find();
      return res.status(200).json(goals);
    } catch (error) {
      res.status(500).json({
        status: "failure",
        error: error.message,
      });
    }
  },
  //*********************************************//
  //------- Find a goal and its missions--------//
  //********************************************//
  async find(req, res) {
    try {
      const goal = await Goal.findById(req.params.id);
      if (goal !== null) {
        const goalWithMissions = await Goal.aggregate([
          {
            $match: { _id: mongoose.Types.ObjectId(req.params.id) },
          },
          {
            $lookup: {
              from: "missions",
              localField: "_id",
              foreignField: "goalId",
              as: "missions",
            },
          },
        ]);
        return res.status(200).json({
          status: "success",
          data: goalWithMissions,
        });
      } else {
        return res.status(404).json({
          status: "failure",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "failure",
        error: error.message,
      });
    }
  },
  //*******************************//
  //------- Save a new goal -------//
  //*******************************//
  async store(req, res) {
    try {
      const goal = await Goal.create(req.body);
      if (goal !== null) {
        return res.status(201).json({
          status: "success",
          data: goal,
        });
      } else {
        return res.status(400).json({
          status: "failure",
          data: null,
        });
      }
      return res.json(goal);
    } catch (error) {
      res.status(500).json({
        status: "failure",
        error: error.message,
      });
    }
  },

  //*********************//
  //------- Delete-------//
  //*********************//
  async delete(req, res) {
    try {
      const goal = await Goal.findByIdAndRemove(req.params.id);
      if (goal !== null) {
        return res.status(200).json({
          status: "success",
        });
      } else {
        return res.status(404).json({
          status: "failure",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "failure",
        error: error.message,
      });
    }
  },
};

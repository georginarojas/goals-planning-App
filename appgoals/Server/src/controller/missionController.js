const mongoose = require("mongoose");
const Mission = mongoose.model("Mission");

module.exports = {
  //*********************//
  //------- Index -------//
  //*********************//
  async index(req, res) {
    try {
      const mission = await Mission.find();
      return res.status(200).json(mission);
    } catch (error) {
      res.status(500).json({
        status: "failure",
        error: error.message,
      });
    }
  },

  //*******************************//
  //----- Save a new mission ------//
  //*******************************//
  async store(req, res) {
    try {
      const mission = await Mission.create(req.body);
      if (mission !== null) {
        return res.status(201).json({
          status: "success",
          data: mission,
        });
      } else {
        return res.status(400).json({
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
  //*********************************************//
  //------- Find a mission and its tasks --------//
  //********************************************//
  async find(req, res) {
    try {
      const mission = await Mission.findById(req.params.id);
      if (mission !== null) {
        const missionWithTasks = await Mission.aggregate([
          {
            $match: { _id: mongoose.Types.ObjectId(req.params.id) },
          },
          {
            $lookup: {
              from: "tasks",
              localField: "_id",
              foreignField: "missionId",
              as: "tasks",
            },
          },
        ]);
        console.log(">>>> FIND MISSION WITH TASKS ", missionWithTasks);
        return res.status(200).json({
          status: "success",
          data: missionWithTasks,
        });
      } else {
        return res.status(400).json({
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

  //*********************//
  //------- Delete-------//
  //*********************//
  async delete(req, res) {
    try {
      const mission = await Mission.remove({ _id: req.params.id });
      if (mission !== null) {
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

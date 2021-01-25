const mongoose = require("mongoose");
const Task = mongoose.model("Task");

module.exports = {
  //*********************//
  //------- Index -------//
  //*********************//
  async index(req, res) {
    try {
      const task = await Task.find();
      if (task !== null) {
        return res.status(201).json({
          status: "success",
          data: task,
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

  //*******************************//
  //------- Save a new task -------//
  //*******************************//
  async store(req, res) {
    try {
      const task = await Task.create(req.body);
      if (task !== null) {
        return res.status(201).json({
          status: "success",
          data: task,
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
  async delete(req, res){
    try{
      const task = await Task.findByIdAndRemove(req.params.id);
      if(task !== null) {
        return res.send();
      } else {
        return res.status(404).send()
      }  
    } catch (error) {
      res.status(500).json({
        status: "failure",
        error: error.message,
      })
    }
  },

};

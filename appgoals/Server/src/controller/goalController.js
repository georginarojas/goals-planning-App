const mongoose = require("mongoose");
const Goal = mongoose.model("Goal");

module.exports = {
  async index(req, res) {
    const goals = await Goal.find({ userId: req.body.userId });
    return res.json(goals);
  },

  async find(req, res) {
    const goal = await Goal.findOne({ userId: req.body.userId })
      .populate("userId", "name")
      .exec((error, goal) => {
        if (error) {
          return handleError(error);
        }
        console.log("Goal user name ", goal.userId.name);
        console.log("Goal age user ", goal.userId.age);
        console.log(">> GOAL ", goal);
      });
    // console.log(">> GOAL ", goal);
    return res.json(goal);
  },

  async store(req, res) {
    console.log("Entrei");
    const goal = await Goal.create(req.body);
    console.log(">> GOAL ", goal);
    return res.json(goal);
  },

  async delete(req, res){
      console.log("Delete id ", req.body._id)
      const goal = await Goal.findByIdAndRemove(req.body._id);
      return res.json(goal);
  }
};

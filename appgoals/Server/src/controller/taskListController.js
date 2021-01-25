const mongoose = require("mongoose");
const TaskList = mongoose.model("TaskList");

module.exports = {

    async store(req, res) {
        const taskList = await TaskList.create(req.body);
        return res.json(taskList);
    }
}
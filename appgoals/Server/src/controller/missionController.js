const mongoose = require("mongoose");
const Mission = mongoose.model("Mission");

module.exports = {

    async store(req, res) {
        const mission = await Mission.create(req.body);
        return res.json(mission);
    }

};
const mongoose = require("mongoose");
const User = mongoose.model("User");

async function findUsername(username) {
  const user = await User.findOne({ username }).exec();
  return user;
}

async function findName(name) {
  return await User.findOne({ name }).exec();
}

module.exports = {
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async show(req, res) {
    const user = await User.findById(req.params.id);

    return res.json(user);
  },

  async query(req, res) {
    const username = req.params.username;
    const user = await findUsername(username);

    return res.json(user);
  },

  async store(req, res) {
    const usernameObj = await findUsername(req.body.username);
    const nameObj = await findName(req.body.name);

    if (usernameObj === null && nameObj === null) {
      const user = await User.create(req.body);
      return res.json(user);
    } else {
      console.error("Sorry this user exists");
      return null;
    }
  },

  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(user);
  },

  async destroy(req, res) {
    await User.findByIdAndRemove(req.params.id);
    return res.send();
  },
};

const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");


async function findData(data) {
  const user = await User.find(data);
  return user;
}

async function findUsername(username) {
  const user = await User.findOne({ username }).exec();
  return user;
}

async function findEmail(email) {
  return await User.findOne({ email }).exec();
}

//------------------------------

module.exports = {
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async show(req, res) {
    const user = await User.findById(req.params.id);

    return res.json(user);
  },

  // Check if a username or e-mail exist
  async query(req, res) {
    try {
      const { search_field, search_value } = req.query;
      const data = {};
      if (search_field !== "" && search_value !== "") {
        data[search_field] = search_value;
      }
      const user = await findData(data);

      return res.json(user);
    } catch (error) {
      res.status(500).json({
        status: "failure",
        error: error.message,
      });
    }
  },

  // Save a new user
  async store(req, res) {
    try {
      const usernameObj = await findUsername(req.body.username);
      const emailObj = await findEmail(req.body.email);

      if (usernameObj === null && emailObj === null) {
        const user = await User.create(req.body);
        return res.status(201).json({
          status: "created",
          data: user,
        });
      } else {
        return res.status(400).json({
          status: "failure",
          error: "User is already exist"
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "failure",
        error: error.message,
      });
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

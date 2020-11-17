const mongoose = require("mongoose");
const User = mongoose.model("User");

async function findUsername(username) {
  const user = await User.findOne({ username }).exec();
  return user;
}

async function findData(data){
  const user = await User.find(data);
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

  // async query(req, res) {
  //   const username = req.params.username;
  //   const user = await findUsername(username);

  //   return res.json(user);
  // },

  async query(req, res) {
    try{
    const {search_field, search_value} = req.query;

    const data = {};
    if(search_field !== '' && search_value !== ''){
      data[search_field] = search_value;
    }
    console.log("::data::", data);
    const user = await findData(data);

    console.log(">>>> User: ", user.length);

    if (!user || user.length === 0) {
      return res.status(404).json({
        status: 'failure',
        message: `User with the given ${search_field} : ${search_value} not found`,
      });

    } else {

    res.status(200).json({
      status: 'success',
      data: user
    });
    }
    // return res.json(user)
    } catch (error) {
      res.status(500).json({
        status: 'failure',
        error: error.message
      });
    }
  },

  async store(req, res) {
    const usernameObj = await findUsername(req.body.username);
    const nameObj = await findName(req.body.name);

    if (usernameObj === null && nameObj === null) {
      const user = await User.create(req.body);
      return res.json(user);
    } else {
      return res.json(null);
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

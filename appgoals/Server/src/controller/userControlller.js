const mongoose = require("mongoose");
const User = mongoose.model("User");

const passport = require("passport");
const jwtSecret = require("../config/jwtConfig");
const jwt = require("jsonwebtoken");



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

  // Index
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  async show(req, res) {
    const user = await User.findById(req.params.id);

    return res.json(user);
  },

  // Query a user information
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

  // Login user
  login(req, res, next){
    passport.authenticate('local-signin', (error, users, info) =>{
      if(error){
        console.log(`>>>> Error ${error}`);
      }
      if(info !== undefined){
        console.log(`Info ${info.message}`);
      } else {
        console.log(`++++ Users ${users._id}`);
  
        req.logIn(users, ()=> {
          console.log("***REQ ", req.body.username);
          if(req.body.username.indexOf("@")=== -1){
            // console.log("USERNAME ", User.findOne({username: req.body.username, }));
            User.findOne({username: req.body.username, }).then(user => {
              console.log("USERNAME ", user);
              const token = jwt.sign({ id: user._id }, jwtSecret.secret, {
                expiresIn: 60*60,
              });
              res.status(200).send({ 
                auth: true,
                token,
                message: "user found and logged in",
              });
            });  
          } else {
            // console.log("EMAIL ", User.findOne({email: req.body.username, }));
            User.findOne({email: req.body.username, }).then(user => {
              console.log("EMAIL ", user);
              const token = jwt.sign({ id: user._id }, jwtSecret.secret, {
                expiresIn: 60*60,
              });
              res.status(200).send({ 
                auth: true,
                token,
                message: "user found and logged in",
              });
            });  
          }
        });
      }
    })(req, res, next);
  },
  



  // Update User
  async update(req, res) {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(user);
  },

  // Delete User
  async destroy(req, res) {
    await User.findByIdAndRemove(req.params.id);
    return res.send();
  },
};

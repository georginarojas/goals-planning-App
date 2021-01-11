const mongoose = require("mongoose");
const User = mongoose.model("User");

const passport = require("passport");
const jwtSecret = require("../config/jwtConfig");
const jwt = require("jsonwebtoken");

// Functions

async function findData(data) {
  const user = await User.find(data);
  return user;
}

async function findUsername(username) {
  if (username.indexOf("@") === -1) {
    const user = await User.findOne({ username }).exec();
    return user;
  }
}

async function findEmail(email) {
  let re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(email)) {
    return await User.findOne({ email }).exec();
  }
}

//------------------------------

module.exports = {
  // Index
  async index(req, res) {
    const users = await User.find();

    return res.json(users);
  },

  // async show(req, res) {
  // const user = await User.findById(req.params.id);
  // return res.json(user);
  // },

  // Find user
  show(req, res, next) {
    passport.authenticate("jwt", { session: false }, (error, user, info) => {
      console.log(
        ` >>>> CONTROLLER FIND error ${error}, , reqID ${req.query.userId} info ${info}`
      );
      //userID ${user._id}
      if (error) {
        console.log("CONTROLLER show ", error);
        res.status(500).json({
          status: "failure",
          error: error.message,
        });
      }
      if (info !== undefined) {
        console.log("INFORMATION msg", info.message);
        res.status(401).send({
          auth: false,
          message: info.message,
        });
      } else if (user._id == req.query.userId) {
        // try {
          User.findById({ _id: req.query.userId }).then((userInfo) => {
            if (userInfo != null) {
              console.log("User found Controller");
              userInfo.password = undefined;
              res.status(200).json({
                status: "success",
                data: userInfo,
                auth: true,
              });
            } else {
              console.error("not user found");
              res.status(401).send({
                status: "failure",
                data: null,
                message: "User not found",
                auth: false,
              });
            }
          });
        // } catch (error) {
        //   console.error("ERROR SERVER");
        //   res.status(500).json({
        //     status: "failure",
        //     error: error.message,
        //   });
        // }
      } else {
        console.error("jwt id do not match");
        res.status(403).send({
          status: "failure",
          message: "id and jwt token do not match",
          auth: false,
        });
      }
    })(req, res, next);
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
          error: "Was not possible to create a user",
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "failure",
        error: error.message,
      });
    }
  },

  // >>> Login
  login(req, res, next) {
    passport.authenticate("local-signin", (error, users, info) => {
      console.log(
        `>>> Controller LOGIN errr ${error}, user  ${users}, info ${info}`
      );
      if (error) {
        console.log(`>>>> Error ${error}`);
      }
      if (info !== undefined) {
        console.log(`Info ${info.message}`);
        if (info.message === "User not found") {
          res.status(401).send(info.message);
        } else {
          res.status(403).send(info.message);
        }
      } else {
        req.logIn(users, async () => {
          try {
            if (req.body.username.indexOf("@") === -1) {
              var user = await findUsername(req.body.username);
            } else {
              var user = await findEmail(req.body.username);
            }
            console.log("USER LOGIN ", user);
            user.password = undefined;
            const id = user._id;
            const token = jwt.sign({ id }, jwtSecret.secret, {
              expiresIn: 60 * 60,
            });
            res.status(200).json({
              auth: true,
              token,
              data: user,
              message: "User found and logged in",
            });
          } catch (error) {
            res.status(500).json({
              status: "failure",
              error: error.message,
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

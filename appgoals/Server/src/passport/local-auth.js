const mongoose = require("mongoose");
const User = mongoose.model("User");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

passport.use(
  "local-signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      if (username.indexOf("@") === -1) {
        var user = await User.findOne({ username: username });
      } else {
        var user = await User.findOne({ email: username });
      }
      if (!user) {
        return done(null, false);
      }
      if (!user.comparePassword(password)) {
        return done(
          null,
          false,
        );
      }
      console.log(">>>> User ", user);
      return done(null, user);
    }
  )
);

//   async login(req, res) {
//     try {
//       const { username, password } = req.body;

//       const user = await User.findOne({ username });

//       if (!user) return res.status(400).send({ error: "User not founf" });
//       if (!(await bcrypt.compareSync(password, user.password)))
//         return res.status(400).send({ error: "Invalid password" });

//       user.password = undefined;

//       return res.status(200).json({
//         status: "success",
//         data: user,
//       });
//     } catch (error) {
//       res.status(500).json({
//         status: "failure",
//         error: error.message,
//       });
//     }
//   };

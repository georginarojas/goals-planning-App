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
      // console.log(`LOCAL AUTH ${username}  ${password}`)
      try{
        if (username.indexOf("@") === -1) {
          var user = await User.findOne({ username: username });
        } else {
          var user = await User.findOne({ email: username });
        }
        if (!user) {
          return done(null, false, {message: 'User not found'});
        }
        // console.log('COMPARE PAss ', user.comparePassword(password));
        if (!user.comparePassword(password)) {
          return done(
            null,
            false,
            {message: 'Password do not match'},
          );
        }
        // console.log(">>>> User ", user);
        return done(null, user);
      } catch(error){
        done(error);
      }
    }
  )
);

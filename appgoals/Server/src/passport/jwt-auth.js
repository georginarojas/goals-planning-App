const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwtSecret = require("../config/jwtConfig");
const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("JWT"),
  secretOrKey: jwtSecret.secret,
};

passport.use(
  "jwt",
  new JWTstrategy(opts, async (jwt_payload, done) => {
    try {
      console.log(">>> JWT_payload", jwt_payload);
      const user = await User.findOne({ _id: jwt_payload.id });
      if (user) {
        console.log("JWT AUTH User found", user._id);
        done(null, user._id);
      } else {
        console.log("User not found");
        done(null, false, { message: "User not found" });
      }
    } catch (error) {
      console.log(">>> JWT_payload ERROr");
       return done(error);
    }
  })
);

// passport.use(
//     'jwt',
//     new JWTstrategy(opts, (jwt_payload, done) => {
//         try{
//             console.log(">>> JWT_payload", jwt_payload);
//             User.findOne({ _id: jwt_payload.id}).then(user => {
//                 if(user){
//                     console.log('JWT AUTH User found', user._id);
//                     done(null, user._id);
//                 } else{
//                     console.log("User not found");
//                     done(null, false, {message: 'User not found'});
//                 }
//             });
//         } catch (error){
//             console.log(">>> JWT_payload ERROr");
//             done(error);
//         }

//     }),
// );

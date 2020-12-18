const mongoose = require('mongoose');
const User = mongoose.model("User");
const jwtSecret = require("../config/jwtConfig");
const passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;


// passport.serializeUser((user, done) => {
//     done(null, user._id);
//   });
  
//   passport.deserializeUser(async (id, done) => {
//     const user = await User.findById(id);
//     done(null, user);
//   });
  

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
};

passport.use(
    'jwt', 
    new JWTstrategy(opts, (jwt_payload, done) => {
        try{
            console.log(">>> JWT_payload", jwt_payload);
            User.findOne({ _id: jwt_payload.id}).then(user => {
                if(user){
                    console.log('User found');
                    done(null, user);
                } else{
                    console.log("User not found");
                    done(null, false);
                }
            });
        } catch (err){
            done(err);
        }

    }),
);

const express = require("express");
const router = express.Router();
const passport = require("passport");


const mongoose = require("mongoose");
const User = mongoose.model("User");
const jwtSecret = require("./config/jwtConfig");
const jwt = require("jsonwebtoken");


const UserControlller = require("./controller/userControlller");


router.get("/user", UserControlller.index);
router.get("/user/search", UserControlller.query);
router.get("/user/:id", UserControlller.show);
router.post("/user", UserControlller.store);

router.get("/login", (req, res, next) => {
  res.render("login");
});



// router.post(
//   "/login",
//   passport.authenticate("local-signin"),
//   function (req, res) {
//     console.log(">>>>> USER ", req.user);
//     res.send(req.user);
//   }
// );

router.post('/login', UserControlller.login);

// router.post('/login', (req, res, next) =>{
//   passport.authenticate('local-signin', (error, users, info) =>{
//     if(error){
//       console.log(`>>>> Error ${error}`);
//     }
//     if(info !== undefined){
//       console.log(`Info ${info.message}`);
//     } else {
//       console.log(`++++ Users ${users._id}`);

//       req.logIn(users, ()=> {
//         console.log("***REQ ", req.body.username);
//         if(req.body.username.indexOf("@")=== -1){
//           // console.log("USERNAME ", User.findOne({username: req.body.username, }));
//           User.findOne({username: req.body.username, }).then(user => {
//             console.log("USERNAME ", user);
//             const token = jwt.sign({ id: user._id }, jwtSecret.secret, {
//               expiresIn: 60*60,
//             });
//             res.status(200).send({ 
//               auth: true,
//               token,
//               message: "user found and logged in",
//             });
//           });  
//         } else {
//           // console.log("EMAIL ", User.findOne({email: req.body.username, }));
//           User.findOne({email: req.body.username, }).then(user => {
//             console.log("EMAIL ", user);
//             const token = jwt.sign({ id: user._id }, jwtSecret.secret, {
//               expiresIn: 60*60,
//             });
//             res.status(200).send({ 
//               auth: true,
//               token,
//               message: "user found and logged in",
//             });
//           });  
//         }
//       });
//     }
//   })(req, res, next);
// });



router.put("/user/:id", UserControlller.update);
router.delete("/user/:id", UserControlller.destroy);

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    console.log(">>>>> AAAAs")
    return next();
  }
  res.redirect("/");
}

module.exports = router;

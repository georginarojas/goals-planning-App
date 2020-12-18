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
router.post("/user", UserControlller.store);

router.get("/login", (req, res, next) => {
  res.render("login");
});


router.get("/findUser", UserControlller.show);

router.post('/login', UserControlller.login);

router.put("/user/:id", UserControlller.update);
router.delete("/user/:id", UserControlller.destroy);


module.exports = router;

const express = require("express");
const router = express.Router();
const passport = require("passport");
const authentication = passport.authenticate("jwt", { session: false });

const UserControlller = require("./controller/userControlller");
const GoalsController = require("./controller/goalController");
const MissionController = require("./controller/missionController");
const TaskController = require("./controller/taskController");

// -------- User routes -------------//
router.get("/user", UserControlller.index);
router.get("/user/search", UserControlller.query);
router.post("/user", UserControlller.store);

router.post("/login", UserControlller.login);

router.get("/auth", UserControlller.veryfyJwt);
router.get("/verify", authentication, UserControlller.show);

router.put("/user/:id", UserControlller.update);
router.delete("/user/:id", UserControlller.delete);

// -------- Goals routes -------------//
router.get("/goals", GoalsController.index);
router.get("/findGoal", GoalsController.find);
router.post("/goals", GoalsController.store);

router.delete("/remove", GoalsController.delete);

// -------- Missions routes -------------//
router.post("/missions", MissionController.store);

// -------- TaskList routes -------------//
router.get("/task", TaskController.index);
router.post("/task", authentication,  TaskController.store);
router.delete("/task/:id", TaskController.delete);

module.exports = router;

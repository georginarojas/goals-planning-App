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

// router.get("/user/:id", authentication, UserControlller.find);
router.get("/user/:id", UserControlller.find);


router.put("/user/:id", UserControlller.update);
router.delete("/user/:id", UserControlller.delete);

router.get("/auth", UserControlller.veryfyJwt);


// -------- Goals routes -------------//
router.get("/goal", GoalsController.index);
router.get("/goal/:id", GoalsController.find);
router.post("/goal", GoalsController.store);

router.put("/goal/:id", GoalsController.update);
router.delete("/goal/:id", GoalsController.delete);

// -------- Missions routes -------------//
router.get("/mission", MissionController.index);
router.post("/mission", MissionController.store);

router.get("/mission/:id", MissionController.find);

router.delete("/mission/:id", MissionController.delete);

// -------- TaskList routes -------------//
router.get("/task", TaskController.index);
router.post("/task", TaskController.store);
router.delete("/task/:id", TaskController.delete);

module.exports = router;

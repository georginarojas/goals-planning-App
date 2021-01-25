const express = require("express");
const router = express.Router();

const UserControlller = require("./controller/userControlller");
const GoalsController = require("./controller/goalController");
const MissionController = require("./controller/missionController");
const TaskListController = require("./controller/taskListController");


router.get("/user", UserControlller.index);
router.get("/user/search", UserControlller.query);
router.post("/user", UserControlller.store);

// router.get("/login", (req, res, next) => {
//   res.render("login");
// });


router.get("/findUser", UserControlller.show);

router.post('/login', UserControlller.login);

router.put("/user/:id", UserControlller.update);
router.delete("/user/:id", UserControlller.destroy);


// -------- Goals routes -------------//
router.get("/goals", GoalsController.index);
router.get("/findGoal", GoalsController.find);
router.post("/goals", GoalsController.store);

router.delete('/remove', GoalsController.delete);

// -------- Missions routes -------------//
router.post("/missions", MissionController.store);

// -------- TaskList routes -------------//
router.post("/taskList", TaskListController.store);

module.exports = router;

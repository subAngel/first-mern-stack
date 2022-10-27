const express = require("express");
const {
	createTask,
	consultTasks,
	updateTask,
	deleteTask,
	consultTask,
} = require("../controller/task.controller");
const router = express.Router();

router.get("/", consultTasks);
router.post("/", createTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);
router.get("/:id", consultTask);

module.exports = router;

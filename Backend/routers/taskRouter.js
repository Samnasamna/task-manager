const express = require("express");
const { getTasks, createTask, getById, updateById, deleteById } = require("../controllers/taskController");
const router = express.Router();

router.route("/").get(getTasks).post(createTask)
router.route("/:id").get(getById).put(updateById).delete(deleteById)

module.exports = router
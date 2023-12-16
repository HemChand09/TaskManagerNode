const express = require("express");
const router = express.Router();
const {
  fetchAllTasks,
  fetchSingleTask,
  deleteTask,
  updateTask,
  createNewTask,
  gettasksByUser,
} = require("../controllers/taskController");

router
  .route("/")
  .get(fetchAllTasks)
  .post(createNewTask);
router
  .route("/:taskId")
  .get(fetchSingleTask)
  .delete(deleteTask)
  .patch(updateTask)

module.exports = router;

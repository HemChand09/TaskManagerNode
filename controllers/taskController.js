const catchAsync = require("../utils/catchAsyncHandler");
const { v4: uuidv4 } = require("uuid");
const {
  createNewTaskHandler,
  fetchAllTasksHandler,
  fetchSingleTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getTasksByUserId,
  getUserTaskList,
} = require("../services/taskService");
const AppError = require("../utils/appError");

const fetchAllTasks = catchAsync(async (req, res, next) => {
  const tasks = await fetchAllTasksHandler();
  res.status(200).json({
    status: "success",
    length: tasks.length,
    data: {
      tasks,
    },
  });
});
const fetchSingleTask = catchAsync(async (req, res, next) => {
  const task = await fetchSingleTaskHandler(req.params.taskId);
  console.log(task, "singleTask");
  if (task.length === 0) {
    return next(
      new AppError(`Cant find task with this : ${req.params.taskId}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
});
const createNewTask = catchAsync(async (req, res, next) => {
  const taskBody = {
    title: req.body.title,
    description: req.body.description,
    dueDate: req.body.dueDate,
    completed: req.body.completed,
    taskId: uuidv4(),
    userId: req.body.userId
  };
  const task = await createNewTaskHandler(taskBody);
  res.status(201).json({
    status: "success",
    task,
  });
});

const gettasksByUser = catchAsync(async (req, res, next) => {
  console.log(req,query , "Hits The UserID handler")
  const task = await getTasksByUserId(req.params.userId);
  console.log(task,"AllTasks List");


})
const updateTask = catchAsync(async (req, res, next) => {
  const updatedTask = await updateTaskHandler(req.params.taskId, req.body);
  if (updatedTask == null || updatedTask === undefined) {
    return next(
      new AppError(`There is no task with id : ${req.params.taskId}`, 404)
    );
  }
  res.status(200).json({
    status: "success",
    data: updatedTask,
  });
});

const deleteTask = catchAsync(async (req, res, next) => {
  let deletedtask = await deleteTaskHandler(req.params.taskId);
  if (deletedtask == null || deletedtask === undefined) {
    return next(
      new AppError(`There is no task with id : ${req.params.taskId}`, 404)
    );
  }
  res.status(204).json({
    status: "success",
  });
});

const getUseTaskList = catchAsync(async(req, res, next) => {
  const useTaskList = await getUserTaskList(req.params.userId);
  console.log(useTaskList);
})
module.exports = {
  fetchAllTasks,
  fetchSingleTask,
  createNewTask,
  updateTask,
  deleteTask,
  gettasksByUser,
  getUseTaskList
};

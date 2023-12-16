const moment = require("moment");
const Task = require("../models/taskModel");
const { request } = require("express");

const options = {
  returnDocument: "after",
};
const fetchAllTasksHandler = async () => {
  console.log("Fetching all tasks Hit API");
  return await Task.find({}).select({ _id: 0, __v: 0 });
};
const fetchSingleTaskHandler = async (taskId) => {
  return await Task.findOne({ taskId });
};
const getTasksByUserId = async (userId) => {
  return await Task.find({ userId });
};
const createNewTaskHandler = async (data) => {
  return await Task.create(data);
};
const updateTaskHandler = async (taskId, body) => {
  console.log(body, "updateTaskHandler");
  body["updatedAt"] = moment().unix();
  return await Task.findOneAndUpdate(
    { taskId },
    {
      $set: body,
    },
    options
  );
};
const deleteTaskHandler = async (taskId) => {
  return await Task.findOneAndDelete({ taskId });
};
const getUserTaskList = async(userId) => {
  console.log(userId,"UserId Coming ");
  return  await Task.find({ userId })
};

module.exports = {
  fetchAllTasksHandler,
  fetchSingleTaskHandler,
  createNewTaskHandler,
  updateTaskHandler,
  deleteTaskHandler,
  getTasksByUserId,
  getUserTaskList
};

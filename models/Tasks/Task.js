const mongoose = require("mongoose");

const Task = mongoose.model("Task", {
  title: String,
  description: String,
  status: String,
  user_id: String,
});

module.exports = Task;

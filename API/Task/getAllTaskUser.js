const express = require("express");
const TaskModel = require("../../models/Tasks/Task.js");

function getTaskUser(app) {
  app.use(express.json());

  app.get("/taskUser/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    try {
      const tasks = await TaskModel.find({ user_id: user_id });

      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
}

module.exports = getTaskUser;

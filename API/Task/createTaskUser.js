const express = require("express");
const TaskModel = require("../../models/Tasks/Task.js");

function createTaskUser(app) {
  app.use(express.json());

  app.post("/task", async (req, res) => {
    const { title, description, status, user_id } = req.body;

    const task = {
      title,
      description,
      status,
      user_id,
    };

    try {
      await TaskModel.create(task);

      res.status(201).json({ message: task });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
}

module.exports = createTaskUser;

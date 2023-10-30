const express = require("express");
const TaskModel = require("../../models/Tasks/Task.js");

function updateTaskById(app) {
  app.use(express.json());

  app.patch("/task/:id", async (req, res) => {
    const id = req.params.id;
    const { title, description, status } = req.body;

    try {
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        {
          title,
          description,
          status,
        },
        { new: true }
      );

      if (!updatedTask) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      res.status(200).json(updatedTask);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
}

module.exports = updateTaskById;

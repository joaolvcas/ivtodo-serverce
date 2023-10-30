const express = require("express");
const TaskModel = require("../../models/Tasks/Task.js");

function deleteTaskById(app) {
  app.use(express.json());

  app.delete("/task/:id", async (req, res) => {
    const id = req.params.id;

    try {
      const deletedTask = await TaskModel.findByIdAndRemove(id);

      if (!deletedTask) {
        return res.status(404).json({ message: "Tarefa não encontrada" });
      }

      res.status(201).json({ message: "Tarefa deletada!" });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
}

module.exports = deleteTaskById;

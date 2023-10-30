const express = require("express");
const UserModel = require("../../models/Users/User.js");

function setupUserRoutes(app) {
  app.use(express.json());

  app.post("/user", async (req, res) => {
    const { username, email, password } = req.body;

    const user = {
      username,
      email,
      password,
    };

    try {
      await UserModel.create(user);

      res.status(201).json({ message: user });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
}

module.exports = setupUserRoutes;

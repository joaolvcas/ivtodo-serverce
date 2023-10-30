const express = require("express");
const UserModel = require("../../models/Users/User.js");

function getUser(app) {
  app.use(express.json());

  app.get("/user/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      if (user.password !== password) {
        return res.status(401).json({ message: "Credenciais inválidas" });
      }

      res.status(200).json({ id: user });
    } catch (error) {
      res.status(500).json({ error: error });
    }
  });
}

module.exports = getUser;

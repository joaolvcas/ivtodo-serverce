const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

const setupUserRoutes = require("./API/User/createUser.js");
setupUserRoutes(app);

const getUser = require("./API/User/getUser.js");
getUser(app);

const createTaskUser = require("./API/Task/createTaskUser.js");
createTaskUser(app);

const getTaskUser = require("./API/Task/getAllTaskUser.js");
getTaskUser(app);

const updateTaskById = require("./API/Task/updateTaskUser.js");
updateTaskById(app);

const deleteTaskById = require("./API/Task/deleteTaskUser.js");
deleteTaskById(app);

mongoose
  .connect(
    "mongodb+srv://joaolucasdevp:UzMbepovEsGPRULa@apicluster.2fvwqnf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(3000);
  })
  .catch((error) => console.log(error));

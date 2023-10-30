const express = require("express");
const mongoose = require("mongoose");
const app = express();

const Person = require("./models/Person");

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

//POST to mongoDB
app.post("/person", async (req, res) => {
  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    await Person.create(person);

    res.status(201).json({ message: "Pessoa inserida com sucesso" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//GET all from mongoDB
app.get("/persons", async (req, res) => {
  try {
    const people = await Person.find();

    res.status(200).json(people);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//GET one from mongoDB
app.get("/person/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    res.status(200).json(person);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//UPDATE one from mongoDB
app.patch("/person/:id", async (req, res) => {
  const id = req.params.id;

  const { name, salary, approved } = req.body;

  const person = {
    name,
    salary,
    approved,
  };

  try {
    const updatePerson = await Person.updateOne({ _id: id }, person);

    res.status(200).json(updatePerson);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

app.delete("/person/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ _id: id });

    await Person.deleteOne(person);

    res.status(200).json("Deletado com sucesso");
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

mongoose
  .connect(
    "mongodb+srv://joaolucasdevp:UzMbepovEsGPRULa@apicluster.2fvwqnf.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(3000);
  })
  .catch((error) => console.log(error));

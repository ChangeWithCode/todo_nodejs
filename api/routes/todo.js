const express = require("express");
const mongoose = require("mongoose");
const Todo = require("../../models/todo"); // Correct import path
const checkAuth = require('../middelware/checkAuth'); // Correct import path

const router = express.Router();

router.get("/", checkAuth, (req, res, next) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const skip = (page - 1) * limit;

  // Filter Todo items by the user's ID
  Todo.find({ user: req.userData.userId }) // Assuming user ID is available in req.userData
    .skip(skip)
    .limit(limit)
    .exec()
    .then((results) => {
      res.status(200).json(results);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});

router.post("/", checkAuth, (req, res, next) => {
  const product = new Todo({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    details: req.body.details,
    status: req.body.status,
    startDate: req.body.startDate || new Date(),
    priority: req.body.priority,
    tags: req.body.tags,
    user: req.userData.userId, // Associate the Todo with the authenticated user
  });

  if (product.name) {
    product
      .save()
      .then((result) => {
        console.log(result);
        res.status(201).json({
          message: "Handling post methods",
          created: product,
        });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({ error: err });
      });
  } else {
    res.status(406).json({ message: "Name is required" });
  }
});

router.delete("/:todoId", checkAuth, (req, res, next) => {
  const id = req.params.todoId;
  // Make sure to include the user filter to delete only the user's Todo item
  Todo.deleteOne({ _id: id, user: req.userData.userId })
    .exec()
    .then((result) => {
      res.status(200).json({ message: "Todo deleted" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

module.exports = router;

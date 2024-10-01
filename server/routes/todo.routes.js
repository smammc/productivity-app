const express = require("express");
const mongoose = require("mongoose");

const Todo = require("../models/Todo.model");

const router = express.Router();

// POST Todo
router.post("/todo", (request, response, next) => {
  Todo.create(request.body)
    .then((createdTodo) => {
      console.log("Todo created -> ", createdTodo);
      response.status(201).json(createdTodo);
    })
    .catch((error) => {
      console.log("Error creating todo -> ", error);
      response.status(500).json({ error: "Failed to create todo" });
    });
});

// GET Todos from user
router.get("/todo/:userId", (request, response, next) => {
  const { userId } = request.params;
  Todo.find({ user: userId })
    .then((todos) => {
      console.log("Retrieved todos -> ", todos);
      response.status(200).json(todos);
    })
    .catch((error) => {
      console.log("Error retrieving todos -> ", todos);
      response.status(500).json({ error: "Failed to retrieve todos" });
    });
});

// GET specific Todo from user
router.get("/todo/:userId/:todoId", (request, response, next) => {
  const { userId, todoId } = request.params;
  Todo.findById(todoId)
    // .populate(todoId)
    .then((todo) => {
      console.log("Retrieved todo -> ", todo);
      response.status(200).json(todo);
    })
    .catch((error) => {
      console.log("Error retrieving todo -> ", error);
      response.status(500).json({ message: "Error retrieving todo" });
    });
});

// UPDATE Todo
router.put("/todo/:userId/:todoId", (request, response, next) => {
  const { todoId } = request.params;
  Todo.findByIdAndUpdate(todoId, request.body, { new: true })
    .then((updatedTodo) => {
      console.log("Updated todo -> ", updatedTodo);
      response.status(204).json({ message: `Todo ${todoId} updated` });
    })
    .catch((error) => {
      console.log("Error updating todo -> ", error);
      response.status(500).json({ message: "Failed to update todo" });
    });
});

// DELETE Todo
router.delete("/todo/:userId/:todoId", (request, response, next) => {
  const { todoId } = request.params;
  Todo.findByIdAndDelete(todoId)
    .then((deletedTodo) => {
      console.log("Todo deleted");
      response.status(204).send("Todo deleted");
    })
    .catch((error) => {
      console.log("Error while deleting todo -> ", error);
      response.status(500).json({ error: "Failed to delete todo" });
    });
});

module.exports = router;

const express = require('express');
const tasksController = require('../Controllers/taskController');
const { mongoClient } = require('../MongoDBConnect');

const router = express.Router();

// Create a new task
router.post('/', tasksController.createTask);

// Fetch a task by ID
router.get('/:id', tasksController.getTaskById);

// Update a task by ID
router.put('/:id', tasksController.updateTaskById);

module.exports = router;

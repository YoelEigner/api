const { ObjectId } = require('mongodb');
const { mongoClient } = require('../MongoDBConnect');
const Task = require('../Modals/TaskModal');

// Create a new task

const db = mongoClient.db('tasks');
const collection = db.collection('task');

const createTask = async (req, res) => {
    try {
        const { title, description, priority } = req.body;
        const task = new Task(null, title, description, priority);

        const result = await collection.insertOne(task);
        const createdTask = result.insertedId;

        res.status(201).json(createdTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);

        const task = await collection.findOne({ _id: new ObjectId(id) });

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, priority } = req.body;
        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, description, priority } }
        );
        if (result.modifiedCount === 0 && result.matchedCount === 0) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    createTask,
    getTaskById,
    updateTaskById,
};

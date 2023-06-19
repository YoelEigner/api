const { ObjectId } = require('mongodb') 
const { mongoClient } = require('../MongoDBConnect') 
const Task = require('../Modals/TaskModal') 

// Create a new task

const db = mongoClient.db('tasks') 
const collection = db.collection('task') 

const calculatePriority = (description) => {
    let priority = 0
    const descriptionLength = description.length 
    if (descriptionLength < 10) {
        priority = 1
    } else if (descriptionLength >= 10 && descriptionLength <= 20) {
        priority = 2
    } else {
        priority = 3
    }
    return priority
}
const createTask = async (req, res) => {
    try {
        const { title, description } = req.body 
        let priority = calculatePriority(description)

        const task = new Task(null, title, description, priority) 
        const result = await collection.insertOne(task) 
        const createdTask = result.insertedId 
        res.json({ id: createdTask, priority })
    } catch (error) {
        console.error(error) 
        res.status(500).json({ error: 'Internal server error' }) 
    }
} 
const getTaskById = async (req, res) => {
    try {
        const { id } = req.params 
        const task = await collection.findOne({ _id: new ObjectId(id) }) 

        if (!task) {
            return res.status(404).json({ error: 'Task not found' }) 
        }
        task.id = task._id
        res.json(task) 
    } catch (error) {
        console.error(error) 
        res.status(500).json({ error: 'Internal server error' }) 
    }
} 


const updateTaskById = async (req, res) => {
    try {
        const { id } = req.params 
        const { title, description } = req.body 
        let priority = calculatePriority(description)

        const result = await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { title, description, priority } }
        ) 
        if (result.modifiedCount === 0 && result.matchedCount === 0) {
            return res.status(404).json({ error: 'Task not found' }) 
        }

        res.json({ id, title, description, priority })
    } catch (error) {
        console.error(error) 
        res.status(500).json({ error: 'Internal server error' }) 
    }
} 

module.exports = {
    createTask,
    getTaskById,
    updateTaskById,
} 

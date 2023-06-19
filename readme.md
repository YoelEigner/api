# Task API

## Overview
This is a Node.js application that provides an API for the [Task-Managment-System](https://github.com/YoelEigner/Task-Managment-System). It uses Express.js as the web server and MongoDB as the database.

## Setup
Before you begin, ensure you have Node.js installed on your machine. If you don't have Node.js installed, you can download it from [Node.js official website](https://nodejs.org/).

1. Clone this repository to your local machine using 
```bash
git clone https://github.com/YoelEigner/task-api.git
```
2. Navigate into the cloned repository using 
```bash
cd task-api
```
3. Install the project dependencies using
```bash
npm install
```
4. Ensure MongoDB is set up and running. The project uses MongoDB Atlas and the connection string is already provided in the code.

## Running the Application
To start the server, use the command below from the root directory of the project
```bash
npm start
```

## API Endpoints

#### The task API provides the following endpoints:
### `POST /`
Adds a new task to the database.

### `GET /:id``
Gets the task by ID.

### `PUT /:id`
Updates a task by the specified ID


## Contributing

If you would like to contribute to the Products API, you can do so by submitting a pull request on GitHub. Before submitting a pull request, please ensure that your code follows the project's coding standards and that all tests pass.

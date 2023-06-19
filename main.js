const express = require('express');
const app = express();
const router = require("./routes/router");
require('dotenv').config();
const cors = require('cors');
var bodyParser = require('body-parser');
const { mongoConnect } = require('./MongoDBConnect');

const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/api/tasks/", router);
mongoConnect()


app.listen(port, () => {
    console.log(`Server listening at http://localhost:/${port}/api/tasks`);
})
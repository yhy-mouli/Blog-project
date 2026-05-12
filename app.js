const express = require("express");
const connectToDb = require("./config/connectToDb");
require("dotenv").config();

// Connection to db
connectToDb();

// Init App
const app = express();

// Middlewares
app.use(express.json());

// Running Server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Port is running in ${process.env.NODE_ENV} on port ${process.env.PORT}`))

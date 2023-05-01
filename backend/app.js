const express = require('express');
const app = express();
const cookieParser = require("cookie-parser"); 
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require("path");

const errorMiddleware = require("./middleware/error");

//CONFIG
if(process.env.NODE_ENV !== "PRODUCTION"){
    require("dotenv").config({path: "backend/config/config.env"});
}


//MIDDLEWARE
app.use(cors());
app.use(express.json({
    limit: '50mb'
  }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended:true }));

// ROUTE IMPORT
const user = require('./routes/userRoutes');
const article = require('./routes/articleRoutes');

app.use("/api", user);
app.use("/api", article);

//Middleware for ERROR
app.use(errorMiddleware);

module.exports = app;
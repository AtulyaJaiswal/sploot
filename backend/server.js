const app = require('./app');
const connectDatabase = require("./config/database");
const dotenv = require('dotenv');

//Handling Uncaught Exception
process.on("uncaughtException", (err) => {
     console.log(`Error: ${err.message}`);
     console.log(`Shutting down server due to uncaught Exception`);
     process.exit(1);    
});

//CONFIG
if(process.env.NODE_ENV !== "PRODUCTION"){
     require("dotenv").config({path: "backend/config/config.env"});
}

// CONNECT DATABASE
connectDatabase();

const server = app.listen(process.env.PORT, ()=>{
     console.log(`Server running on ${process.env.PORT}`);
});

//Unhandled promise rejection
process.on("unhandledRejection", (err) => {
     console.log(`Error: ${err.message}`);
     console.log(`Shutting down server due to unhandled rejection`);
 
     server.close(() => {
         process.exit(1);
     });
});

module.exports = app;
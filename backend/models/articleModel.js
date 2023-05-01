const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
     title:{
          type:String,
          required:[true, "Please enter the title"],
     },
     description:{
          type:String,
          required:[true, "Please enter the description"],
     },
     userEmail:{
          type:String,
          required:[true, "Not getting user email"],
     },
     userName:{
          type:String,
          required:[true, "Not getting user name"],
     }
});

module.exports = mongoose.model("Article", articleSchema);
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        maxLength:[30, "Name should be less than 30 characters"],
        minLength:[3,"Name should have more than 4 characters"],
    },
    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:true,
        validate:[validator.isEmail, "Please enter a valid email"],
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minLength:[8,"Password should have more than 8 characters"],
        select:false,
    },
    age:{
        type:Number,
        required:[true, "Please enter your age"],
        min: [5, "Not a valid age under 0"],
        max:[100, "Not a valid age above 100"],
    }
});

//PASSWORD HASHING
userSchema.pre("save", async function(next){
     if(!this.isModified("password")){
         next();
     }
     this.password = await bcrypt.hash(this.password,10);
});

//COMPARE PASSWORD
userSchema.methods.comparePassword = async function(enteredPassword){
     return await bcrypt.compare(enteredPassword, this.password);
};
//JWT TOKEN
userSchema.methods.getJWTToken = function(){
     return jwt.sign({id:this._id}, process.env.JWT_SECRET,{
         expiresIn: process.env.JWT_EXPIRE,
     });
};
 
 
 
module.exports = mongoose.model("User", userSchema);
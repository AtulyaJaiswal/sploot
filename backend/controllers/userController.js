const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require('../models/userModel');
const sendToken = require("../utils/jwtToken");

//REGISTER USER
exports.registerUser = catchAsyncErrors(async(req,res,next) => {

     const {email,password,name,age} =req.body;

     const userExist = await User.findOne({email});

     if(userExist){
          return next(new ErrorHandler("User with this email already exist.",400));
     }

     const user = await User.create({
          email, password,name,age
     });

     sendToken(user,201,res);
});

//LOGIN USER
exports.loginUser = catchAsyncErrors(async(req,res,next) => {

     const {email, password} = req.body;
     if(!email){
          return next(new ErrorHandler("Please Enter email",400));
     }
     if(!password){
          return next(new ErrorHandler("Please Enter password",400));
     }

     const user = await User.findOne({ email }).select("+password");
     if(!user){
          return next(new ErrorHandler("Invalid email or password",401));
     }

     const isPasswordMatched = await user.comparePassword(password);
     if(!isPasswordMatched){
          return next(new ErrorHandler("Invalid email or password",401));
     }

     sendToken(user,200,res);
});

//UPDATE USER
exports.updateUser = catchAsyncErrors(async (req,res,next) => {

     const id = req.params.id;

     const {name, age} = req.body;
     if(!name || !age){
          return next(new ErrorHandler("Enter name and age properly",400));
     }

     const updatedUserDate = {
          name,age
     };
     const user = await User.findByIdAndUpdate(req.params.id, updatedUserDate, {
          new:true,
          runValidators:true,
          useFindAndModify: false,
     });
     
     res.status(200).json({
          statusCode: 200,
          user
     })

})

//LOGOUT USER
exports.logout = catchAsyncErrors(async (req,res,next) =>{

     res.cookie("token",null, {
         expires: new Date(Date.now()),
         httpOnly: true,
     })
 
     res.status(200).json({
          statusCode: 200,
          message: "Logged Out",
     });
});
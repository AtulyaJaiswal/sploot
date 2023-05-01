const ErrorHandler = require("../utils/errorhandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Article = require('../models/articleModel');

//CREATE NEW ARTICLE
exports.createArticle = catchAsyncErrors(async(req,res,next) => {
     
     const {title,description} = req.body;

     const article = await Article.create({
          title,description,
          userName: req.user.name,
          userEmail: req.user.email,
     });

     res.status(201).json({
          statusCode: 201,
          article,
     })
});

//GET ALL ARTICLES
exports.getAllArticles = catchAsyncErrors(async(req,res,next) => {

     const articles = await Article.find();

     res.status(200).json({
          statusCode: 200,
          articles,
     })
});
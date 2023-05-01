const express = require("express");
const { 
     createArticle, 
     getAllArticles 
} = require("../controllers/articleController");
const { isAuthenticatedUser } = require("../middleware/auth");
const router = express.Router();

router.route("/users/:id/articles").post(isAuthenticatedUser, createArticle);
router.route("/articles").get(isAuthenticatedUser, getAllArticles);

module.exports = router;
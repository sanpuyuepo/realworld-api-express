const express = require("express");
const articlesCtrl = require("../controller/article");
const articleValidator = require("../validator/article");
const auth = require("../middleware/auth");

const router = express.Router();

// List Articles
router.get("/", articlesCtrl.getArticles);

// Feed Articles
router.get("/feed", articlesCtrl.getArticleFeed);

// Get Article
router.get("/:slug", articleValidator.getArticle, articlesCtrl.getArticle);

// Create Article
router.post(
  "/",
  auth,
  articleValidator.createArticle,
  articlesCtrl.createArticle
);

// Update Article
router.put(
  "/:slug",
  auth,
  articleValidator.updateArticle,
  articlesCtrl.updateArticle
);

// Delete Article
router.delete(
  "/:slug",
  auth,
  articleValidator.deleteArticle,
  articlesCtrl.deleteArticle
);

// Add Comments to an Article
router.post("/:slug/comments", articlesCtrl.postArticleComments);

// Get Comments from an Article
router.get("/:slug/comments", articlesCtrl.getArticleComments);

// Delete Comment
router.delete("/:slug/comments/:id", articlesCtrl.deleteComment);

// Favorite Article
router.post("/:slug/favorite", articlesCtrl.favorite);

// Unfavorite Article
router.delete("/:slug/favorite", articlesCtrl.unfavorite);

module.exports = router;

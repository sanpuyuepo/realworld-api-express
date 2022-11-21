const { Article, User } = require("../model");
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");

// List articles
exports.getArticles = async (req, res, next) => {
  try {
    const { limit = 20, offset = 0, tag, author } = req.query;

    const filter = {};
    // tags
    if (tag) {
      filter.tagList = tag;
    }
    // author
    if (author) {
      const user = await User.findOne({ username: author });
      filter.author = user ? user._id : null;
    }

    const articles = await Article.find(filter)
      .skip(parseInt(offset))
      .limit(parseInt(limit));

    const articlesCount = articles.length;

    res.status(200).json({
      articles,
      articlesCount,
    });
  } catch (err) {
    next(err);
  }
};

exports.getArticleFeed = async (req, res, next) => {
  try {
    res.send("get /articles/feed");
  } catch (err) {
    next(err);
  }
};

exports.getArticle = async (req, res, next) => {
  try {
    const article = await Article.findById(req.params.slug).populate("author");
    if (!article) {
      return res.status(404).end();
    }
    res.status(200).json({
      article,
    });
  } catch (err) {
    next(err);
  }
};

exports.createArticle = async (req, res, next) => {
  try {
    const article = new Article(req.body.article);
    article.author = req.user._id;
    article.populate("author");
    await article.save();
    res.status(201).json({
      article,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateArticle = async (req, res, next) => {
  try {
    const article = req.article;
    const bodyArticle = req.body.article;
    article.title = bodyArticle.title || article.title;
    article.description = bodyArticle.description || article.description;
    article.body = bodyArticle.body || article.body;

    await article.save();

    res.status(200).json({
      article,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteArticle = async (req, res, next) => {
  try {
    const article = req.article;
    await article.remove();
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

exports.postArticleComments = async (req, res, next) => {
  try {
    res.send("post /articles/:slug/comments");
  } catch (err) {
    next(err);
  }
};

exports.getArticleComments = async (req, res, next) => {
  try {
    res.send("get /articles/:slug/comments");
  } catch (err) {
    next(err);
  }
};

exports.deleteComment = async (req, res, next) => {
  try {
    res.send("delete /articles/:slug/comments/:id");
  } catch (err) {
    next(err);
  }
};

exports.favorite = async (req, res, next) => {
  try {
    res.send("post /articles/:slug/favorite");
  } catch (err) {
    next(err);
  }
};

exports.unfavorite = async (req, res, next) => {
  try {
    res.send("delete /articles/:slug/favorite");
  } catch (err) {
    next(err);
  }
};

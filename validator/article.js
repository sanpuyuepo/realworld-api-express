const validate = require("../middleware/validator");
const { body, param } = require("express-validator");
const { Article } = require("../model");

exports.createArticle = validate([
  body("article.title").notEmpty(),
  body("article.description").notEmpty(),
  body("article.body").notEmpty(),
]);

exports.getArticle = validate([validate.isValidObjectId(["params"], "slug")]);

exports.updateArticle = [
  validate([validate.isValidObjectId(["params"], "slug")]),

  // 校验文章是否存在
  async (req, res, next) => {
    const slug = req.params.slug;
    const article = await Article.findById(slug);
    req.article = article;
    if (!article) {
      return res.status(404).end();
    }
    next();
  },
  // 修改的文章作者是否是当前登录用户
  async (req, res, next) => {
    if (req.user._id.toString() !== req.article.author.toString()) {
      return res.status(403).end();
    }
    next();
  },
];

exports.deleteArticle = exports.updateArticle;

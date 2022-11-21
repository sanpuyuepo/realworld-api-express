const express = require("express");

const router = express.Router();

// Get Tags
router.get("/", (req, res, next) => {
  try {
    res.send("get /tags");
  } catch (err) {
    next(err);
  }
});

module.exports = router;

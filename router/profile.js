const express = require("express");

const router = express.Router();

// Get profile
router.get("/:username", async (req, res, next) => {
  try {
    res.send("get /profiles/:username");
  } catch (err) {
    next(err);
  }
});
// Follow user
router.post("/:username/follow", async (req, res, next) => {
  try {
    res.send("post /profiles/:username/follow");
  } catch (err) {
    next(err);
  }
});

// Unfollow user
router.delete("/:username/follow", async (req, res, next) => {
  try {
    res.send("delete /profiles/:username/follow");
  } catch (err) {
    next(err);
  }
});

module.exports = router;

const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    const post = await Post.login(req.body);
    return res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    // const post = await Post.login(req.body);
    // return res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
});

router.get("/:postId", async (req, res, next) => {
  try {
    // const post = await Post.login(req.body);
    // return res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
});

router.put("/:postId", async (req, res, next) => {
  try {
    // const post = await Post.login(req.body);
    // return res.status(200).json({ post });
  } catch (err) {
    next(err);
  }
});

router.post("/:postId/ratings", async (req, res, next) => {
  try {
    //
  } catch (err) {
    next(err);
  }
});

router.delete("/:postId", async (req, res, next) => {
  try {
    //   const post = await Post.login(req.body)
    //   return res.status(200).json({ post })
  } catch (err) {
    next(err);
  }
});

module.exports = router;

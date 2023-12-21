const express = require("express");
const Post = require("../models/post");
const security = require("../middleware/security");
const router = express.Router();

router.post("/", security.requireAuthenticatedUser, async (req, res, next) => {
  try {
    const { user } = res.locals;
    const post = await Post.createNewPost({ user, post: req.body });
    return res.status(201).json({ post });
  } catch (err) {
    next(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.listPosts(req.body);
    return res.status(200).json({ posts });
  } catch (err) {
    next(err);
  }
});

router.get("/:postId", async (req, res, next) => {
  try {
    const { postId } = req.params;
    const post = await Post.fetchPostByID(postId);
    return res.status(200).json({ post });
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

const Post = require("../models/post");
const { BadRequestError, ForbiddenError } = require("../utils/errors");

const authUserOwnsPost = async (req, res, next) => {
  try {
    const { user } = res.locals;
    const { postId } = req.params;

    const post = await Post.fetchPostByID(postId);

    if (post.email !== user.email) {
      throw new ForbiddenError(
        "User is not allowed to update other users posts"
      );
    }

    res.locals.post = post;

    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  authUserOwnsPost,
};

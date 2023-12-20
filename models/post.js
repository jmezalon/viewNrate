const db = require("../db");

class Post {
  static async listPosts() {}

  static async fetchPostByID(postId) {}

  static async createNewPost({ post, user }) {}

  static async editPost({ postId, postUpdate }) {}
}

module.exports = Post;

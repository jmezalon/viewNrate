const db = require("../db");

class Rating {
  static async fetchRatingForPostByUser({ user, postId }) {}

  static async createRatingForPost({ rating, user, postId }) {}
}

module.exports = Rating;

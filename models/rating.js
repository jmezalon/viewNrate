const db = require("../db");
const { BadRequestError } = require("../utils/errors");

class Rating {
  static async fetchRatingForPostByUser({ user, postId }) {
    const results = await db.query(
      `
            SELECT rating, user_id, post_id, created_at
            FROM ratings
            WHERE user_id = (SELECT id FROM users WHERE email = $1)
                AND post_id = $2
        `,
      [user.email, postId]
    );

    return results.rows[0];
  }

  static async createRatingForPost({ rating, user, postId }) {
    if (!Number(rating) || Number(rating) < 0 || Number(rating) > 10) {
      throw BadRequestError(
        `Invalid rating provided. Must be an integer between 1 to 10`
      );
    }

    const existingRating = await Rating.fetchRatingForPostByUser({
      user,
      postId,
    });

    if (existingRating) {
      throw new BadRequestError(
        "Users aren't allowed to leave multiple ratings for a single post."
      );
    }

    const results = await db.query(
      `
        INSERT INTO ratings (rating, user_id, post_id)
        VALUES ($1, (SELECT id FROM users WHERE email = $2), $3)
        RETURNING rating, user_id, post_id, created_at
     `,
      [rating, user.email, postId]
    );

    return results.rows[0];
  }
}

module.exports = Rating;

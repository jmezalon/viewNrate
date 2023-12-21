const db = require("../db");
const { BadRequestError, NotFoundError } = require("../utils/errors");

class Post {
  static async listPosts() {
    const results = await db.query(
      `
            SELECT p.id,
                   p.caption,
                   p.img_url AS "imgUrl",
                   p.user_id AS "userId",
                   p.created_at AS "createdAt",
                   p.updated_at AS "updatedAt"
            FROM posts AS p
                JOIN users AS u ON u.id = p.user_id
            ORDER BY p.created_at DESC
        `
    );
    return results.rows;
  }

  static async fetchPostByID(postId) {
    const results = await db.query(
      `
              SELECT p.id,
                     p.caption,
                     p.img_url AS "imgUrl",
                     p.user_id AS "userId",
                     u.email,
                     p.created_at AS "createdAt",
                     p.updated_at AS "updatedAt"
              FROM posts AS p
                  JOIN users AS u ON u.id = p.user_id
              WHERE p.id = $1
          `,
      [postId]
    );

    const post = results.rows[0];

    if (!post) {
      throw new NotFoundError();
    }
    return post;
  }

  static async createNewPost({ post, user }) {
    const requiredField = ["caption", "imgUrl"];
    requiredField.forEach((field) => {
      if (!post.hasOwnProperty(field)) {
        throw new BadRequestError(`Required field - ${field} - is missing!}`);
      }
    });

    if (post.caption.length > 140) {
      throw new BadRequestError("Post caption must be 140 characters or less.");
    }

    const results = await db.query(
      `
            INSERT INTO posts (caption, img_url, user_id)
            VALUES ($1, $2, (SELECT id FROM users WHERE email = $3))
            RETURNING id,
                      caption,
                      img_url AS "imgUrl",
                      user_id AS "userId",
                      created_at AS "createdAt",
                      updated_at AS "updatedAt"
        `,
      [post.caption, post.imgUrl, user.email]
    );

    return results.rows[0];
  }

  static async editPost({ postId, postUpdate }) {
    const requiredField = ["caption"];
    requiredField.forEach((field) => {
      if (!postUpdate.hasOwnProperty(field)) {
        throw new BadRequestError(`Required field - ${field} - is missing!}`);
      }
    });

    const results = await db.query(
      `
            UPDATE posts
            SET caption      = $1,
                updated_at   = NOW()
            WHERE id         = $2
            RETURNING id,
                      caption,
                      img_url AS "imgUrl",
                      user_id AS "userId",
                      created_at AS "createdAt",
                      updated_at AS "updatedAt"
                      
        `,
      [postUpdate.caption, postId]
    );
    return results.rows[0];
  }
}

module.exports = Post;

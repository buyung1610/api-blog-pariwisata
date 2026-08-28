const connectDB = require("../config/connectDb");
const pool = connectDB.pool;

const BlacklistToken = {
  create: async ({ token, expiredAt }) => {
    const [result] = await pool.query(
      "INSERT INTO blacklist_tokens (token, expired_at) VALUES (?, ?)",
      [token, expiredAt]
    );
    return {
      id: result.insertId,
      token,
      expiredAt,
    };
  },

  findOne: async (conditions) => {
    if (conditions.token) {
      const [rows] = await pool.query(
        "SELECT * FROM blacklist_tokens WHERE token = ?",
        [conditions.token]
      );
      return rows[0] || null;
    }
    return null;
  },
};

module.exports = BlacklistToken;

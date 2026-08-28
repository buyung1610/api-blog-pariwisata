const connectDB = require("../config/connectDb");
const pool = connectDB.pool;

const User = {
  findOne: async (conditions) => {
    if (conditions.username && conditions._id && conditions._id.$ne) {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ? AND id != ?",
        [conditions.username, conditions._id.$ne]
      );
      return rows[0] ? { ...rows[0], _id: rows[0].id } : null;
    }
    if (conditions.username) {
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE username = ?",
        [conditions.username]
      );
      return rows[0] ? { ...rows[0], _id: rows[0].id } : null;
    }
    if (conditions._id || conditions.id) {
      const id = conditions._id || conditions.id;
      const [rows] = await pool.query(
        "SELECT * FROM users WHERE id = ?",
        [id]
      );
      return rows[0] ? { ...rows[0], _id: rows[0].id } : null;
    }
    return null;
  },

  findById: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM users WHERE id = ?",
      [id]
    );
    return rows[0] ? { ...rows[0], _id: rows[0].id } : null;
  },

  create: async ({ name, username, password }) => {
    const [result] = await pool.query(
      "INSERT INTO users (name, username, password) VALUES (?, ?, ?)",
      [name, username, password]
    );
    const id = result.insertId;
    return {
      id,
      _id: id,
      name,
      username,
      password,
    };
  },

  update: async (id, { name, username, password }) => {
    await pool.query(
      "UPDATE users SET name = ?, username = ?, password = ? WHERE id = ?",
      [name, username, password, id]
    );
    return await User.findById(id);
  },

  deleteMany: async (filter = {}) => {
    if (filter.name && filter.name.$in && Array.isArray(filter.name.$in)) {
      if (filter.name.$in.length === 0) return { deletedCount: 0 };
      const placeholders = filter.name.$in.map(() => "?").join(",");
      const [result] = await pool.query(
        `DELETE FROM users WHERE name IN (${placeholders})`,
        filter.name.$in
      );
      return { deletedCount: result.affectedRows };
    }
    const [result] = await pool.query("DELETE FROM users");
    return { deletedCount: result.affectedRows };
  },

  insertMany: async (users) => {
    const insertedUsers = [];
    for (const u of users) {
      const created = await User.create(u);
      insertedUsers.push(created);
    }
    return insertedUsers;
  },
};

module.exports = User;

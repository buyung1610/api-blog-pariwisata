const connectDB = require("../config/connectDb");
const pool = connectDB.pool;

const Blog = {
  find: async ({ search = "", searchStartsWith = false, userId = null, skip = 0, limit = 10 }) => {
    let sql = `
      SELECT b.id, b.user_id, b.image, b.title, b.date, b.description, b.category,
             b.created_at, b.updated_at,
             u.id as author_id, u.name as author_name, u.username as author_username
      FROM blogs b
      JOIN users u ON b.user_id = u.id
      WHERE 1=1
    `;
    const params = [];

    if (userId) {
      sql += " AND b.user_id = ?";
      params.push(userId);
    }

    if (search) {
      sql += " AND b.title LIKE ?";
      params.push(searchStartsWith ? `${search}%` : `%${search}%`);
    }

    sql += " ORDER BY b.date DESC LIMIT ? OFFSET ?";
    params.push(parseInt(limit, 10), parseInt(skip, 10));

    const [rows] = await pool.query(sql, params);

    return rows.map((row) => ({
      id: row.id,
      _id: row.id,
      userId: {
        id: row.author_id,
        _id: row.author_id,
        name: row.author_name,
        username: row.author_username,
      },
      image: row.image,
      title: row.title,
      date: row.date,
      description: row.description,
      category: row.category,
    }));
  },

  countDocuments: async ({ search = "", searchStartsWith = false, userId = null } = {}) => {
    let sql = "SELECT COUNT(*) as count FROM blogs WHERE 1=1";
    const params = [];

    if (userId) {
      sql += " AND user_id = ?";
      params.push(userId);
    }

    if (search) {
      sql += " AND title LIKE ?";
      params.push(searchStartsWith ? `${search}%` : `%${search}%`);
    }

    const [rows] = await pool.query(sql, params);
    return rows[0].count;
  },

  findById: async (id) => {
    const sql = `
      SELECT b.id, b.user_id, b.image, b.title, b.date, b.description, b.category,
             b.created_at, b.updated_at,
             u.id as author_id, u.name as author_name, u.username as author_username
      FROM blogs b
      JOIN users u ON b.user_id = u.id
      WHERE b.id = ?
    `;
    const [rows] = await pool.query(sql, [id]);
    if (rows.length === 0) return null;

    const row = rows[0];
    return {
      id: row.id,
      _id: row.id,
      userId: {
        id: row.author_id,
        _id: row.author_id,
        name: row.author_name,
        username: row.author_username,
      },
      user_id: row.user_id,
      image: row.image,
      title: row.title,
      date: row.date,
      description: row.description,
      category: row.category,
    };
  },

  findOne: async (conditions) => {
    const id = conditions._id || conditions.id;
    if (id) {
      return await Blog.findById(id);
    }
    return null;
  },

  create: async ({ userId, image, title, date, description, category }) => {
    const [result] = await pool.query(
      "INSERT INTO blogs (user_id, image, title, date, description, category) VALUES (?, ?, ?, ?, ?, ?)",
      [userId, image, title, date, description, category || null]
    );
    const id = result.insertId;
    return await Blog.findById(id);
  },

  update: async (id, { title, date, description, category, image }) => {
    const existing = await Blog.findById(id);
    if (!existing) return null;

    const updatedTitle = title !== undefined ? title : existing.title;
    const updatedDate = date !== undefined ? date : existing.date;
    const updatedDesc = description !== undefined ? description : existing.description;
    const updatedCat = category !== undefined ? category : existing.category;
    const updatedImg = image !== undefined ? image : existing.image;

    await pool.query(
      "UPDATE blogs SET title = ?, date = ?, description = ?, category = ?, image = ? WHERE id = ?",
      [updatedTitle, updatedDate, updatedDesc, updatedCat, updatedImg, id]
    );
    return await Blog.findById(id);
  },

  findByIdAndDelete: async (id) => {
    const existing = await Blog.findById(id);
    if (!existing) return null;
    await pool.query("DELETE FROM blogs WHERE id = ?", [id]);
    return existing;
  },

  deleteMany: async () => {
    const [countRows] = await pool.query("SELECT COUNT(*) as count FROM blogs");
    const deletedCount = countRows[0].count;
    await pool.query("DELETE FROM blogs");
    return { deletedCount };
  },
};

module.exports = Blog;

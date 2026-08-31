const Blog = require("../models/blogModel");

const formatDate = (dateVal) => {
  if (!dateVal) return "";
  if (dateVal instanceof Date) {
    return dateVal.toISOString().split("T")[0];
  }
  return String(dateVal).split("T")[0];
};

const blogControllers = {
  getAll: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    try {
      const skip = (page - 1) * limit;
      const blogs = await Blog.find({
        search,
        searchStartsWith: true,
        skip,
        limit,
      });

      if (blogs.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Blog kosong", data: [] });
      }

      const result = blogs.map((blog) => ({
        ...blog,
        id: String(blog.id),
        _id: String(blog._id || blog.id),
        title: blog.title,
        date: formatDate(blog.date),
        image: `uploads/${blog.image}`,
        description: blog.description,
        name: blog.userId ? blog.userId.name : "",
      }));

      const totalData = await Blog.countDocuments({
        search,
        searchStartsWith: true,
      });
      const totalPages = Math.ceil(totalData / limit);

      res.json({
        success: true,
        message: "Berhasil mengambil data",
        page,
        limit,
        totalPages,
        totalData,
        data: result,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },

  getById: async (req, res) => {
    try {
      const id = req.params.id;

      const blog = await Blog.findById(id);
      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog tidak ditemukan" });
      }

      const result = {
        ...blog,
        id: String(blog.id),
        _id: String(blog._id || blog.id),
        title: blog.title,
        date: formatDate(blog.date),
        image: `uploads/${blog.image}`,
        description: blog.description,
        name: blog.userId ? blog.userId.name : "",
      };

      res.json({
        success: true,
        message: "Berhasil mengambil data",
        data: result,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },

  getByUserId: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    try {
      const userId = req.user.id;
      const skip = (page - 1) * limit;
      const blogs = await Blog.find({
        userId: userId,
        search,
        searchStartsWith: false,
        skip,
        limit,
      });

      if (blogs.length === 0) {
        return res.status(404).json({ success: false, message: "Blog kosong" });
      }

      const result = blogs.map((blog) => ({
        ...blog,
        id: String(blog.id),
        _id: String(blog._id || blog.id),
        title: blog.title,
        date: formatDate(blog.date),
        image: `uploads/${blog.image}`,
        description: blog.description,
        name: blog.userId ? blog.userId.name : "",
      }));

      const totalData = await Blog.countDocuments({
        userId: userId,
        search,
        searchStartsWith: false,
      });
      const totalPages = Math.ceil(totalData / limit);

      res.json({
        success: true,
        message: "Berhasil mengambil data",
        page,
        limit,
        totalPages,
        totalData,
        data: result,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },

  createBlog: async (req, res) => {
    try {
      const userId = req.user?.id; // pastikan user.id tersedia dari middleware auth

      const { title, description, category } = req.body;
      let date = req.body.date;

      if (!userId) {
        return res.status(400).json({
          errors: [{ message: "User tidak ditemukan, silahkan login" }],
        });
      }

      // Auto set date jika kosong
      if (!date) {
        date = new Date().toISOString().split("T")[0];
      }

      // Validasi gambar
      const image = req.file ? req.file.filename : null;
      if (!image) {
        return res.status(400).json({ message: "Gambar wajib diisi" });
      }

      const blog = await Blog.create({
        userId,
        image,
        title,
        date,
        description,
        category,
      });

      res.status(201).json({
        success: true,
        message: "Blog berhasil ditambahkan",
        data: blog,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },

  updateBlog: async (req, res) => {
    try {
      const userId = req.user?.id;

      const body = req.body || {};

      if (Object.keys(body).length === 0 && !req.file) {
        return res.status(400).json({
          success: false,
          errors: [{ message: "Tidak ada data yang dikirim untuk update" }],
        });
      }

      const { title, date, description, category } = body;
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog tidak ditemukan" });
      }

      const authorId = String(blog.user_id || blog.userId?.id || blog.userId);
      if (authorId !== String(userId)) {
        return res
          .status(403)
          .json({ success: false, message: "Anda tidak memiliki akses" });
      }

      const updatedImage = req.file ? req.file.filename : undefined;

      const updatedBlog = await Blog.update(req.params.id, {
        title,
        date,
        description,
        category,
        image: updatedImage,
      });

      res.status(200).json({
        success: true,
        message: "Blog berhasil diperbarui",
        data: updatedBlog,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const userId = req.user?.id;
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog tidak ditemukan" });
      }

      const authorId = String(blog.user_id || blog.userId?.id || blog.userId);
      if (authorId !== String(userId)) {
        return res
          .status(403)
          .json({ success: false, message: "Anda tidak memiliki akses" });
      }

      await Blog.findByIdAndDelete(req.params.id);

      res.json({ success: true, message: "Blog berhasil dihapus" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },
};

module.exports = blogControllers;

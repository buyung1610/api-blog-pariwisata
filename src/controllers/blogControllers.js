const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const { validationResult } = require("express-validator");

const blogControllers = {
  getAll: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    // Hitung data yang dilewati (skip)
    const skip = (page - 1) * limit;
    try {
      const blogs = await Blog.find({
        title: { $regex: "^" + search, $options: "i" },
      })
        .populate("userId")
        .skip(skip)
        .limit(limit)
        .sort({ date: -1 });

      if (blogs.length === 0) {
        return res
          .status(404)
          .json({ success: false, message: "Blog kosong", data: [] });
      }

      const result = blogs.map((blog) => ({
        id: blog._id,
        title: blog.title,
        date: blog.date.toISOString().split("T")[0],
        image: `uploads/${blog.image}`,
        description: blog.description,
        name: blog.userId.name,
      }));

      const totalData = await Blog.countDocuments();
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
      const blog = await Blog.findById(req.params.id).populate("userId");
      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog tidak ditemukan" });
      }

      const result = {
        id: blog._id,
        title: blog.title,
        date: blog.date.toISOString().split("T")[0],
        image: `uploads/${blog.image}`,
        name: blog.userId.name,
        description: blog.description,
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

    // Hitung data yang dilewati (skip)
    const skip = (page - 1) * limit;
    try {
      const userId = req.user.id;
      const blogs = await Blog.find({
        userId: userId,
        title: { $regex: search, $options: "i" },
      })
        .populate("userId")
        .skip(skip)
        .limit(limit)
        .sort({ date: -1 });

      if (blogs.length === 0) {
        return res.status(404).json({ success: false, message: "Blog kosong" });
      }

      const result = blogs.map((blog) => ({
        id: blog._id,
        title: blog.title,
        date: blog.date.toISOString().split("T")[0],
        image: `uploads/${blog.image}`,
        description: blog.description,
        name: blog.userId.name,
      }));

      const totalData = await Blog.countDocuments({ userId: userId });
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
      // Validasi input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const allErrors = errors.array();
        const seenFields = new Set();
        const uniqueErrors = allErrors.filter((err) => {
          if (seenFields.has(err.path)) return false;
          seenFields.add(err.path);
          return true;
        });
        const shortErrors = uniqueErrors.map((err) => ({
          field: err.path,
          message: err.msg,
        }));
        return res.status(400).json({ errors: shortErrors });
      }

      const userId = req.user?.id; // pastikan user.id tersedia dari middleware auth
      
      const { title, description } = req.body;
      let date = req.body.date;

      if (!userId) {
        return res.status(400).json({ message: "User tidak ditemukan, silahkan login" });
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

      const blog = new Blog({ userId, image, title, date, description });
      await blog.save();

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
      // Validasi input
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const allErrors = errors.array();
        const seenFields = new Set();
        const uniqueErrors = allErrors.filter((err) => {
          if (seenFields.has(err.path)) return false;
          seenFields.add(err.path);
          return true;
        });
        const shortErrors = uniqueErrors.map((err) => ({
          field: err.path,
          message: err.msg,
        }));
        return res.status(400).json({ errors: shortErrors });
      }

      const { title, date, description } = req.body;
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog tidak ditemukan" });
      }

      blog.title = title || blog.title;
      blog.date = date || blog.date;
      blog.description = description || blog.description;

      if (req.file) {
        blog.image = req.file.filename;
      }

      await blog.save();

      res.status(200).json({
        success: true,
        message: "Blog berhasil diperbarui",
        data: blog,
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
      const blog = await Blog.findByIdAndDelete(req.params.id);

      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog tidak ditemukan" });
      }

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

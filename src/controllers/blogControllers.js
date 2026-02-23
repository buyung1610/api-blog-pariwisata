const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const blogControllers = {
  getAll: async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";
    const type = req.user.appSource || "";

    // Hitung data yang dilewati (skip)
    const skip = (page - 1) * limit;
    try {
      const blogs = await Blog.find({
        title: { $regex: "^" + search, $options: "i" },
        type: type,
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
        ...blog.toObject(), // jika pakai Mongoose
        id: blog._id,
        title: blog.title,
        date: blog.date.toISOString().split("T")[0],
        image: `uploads/${blog.image}`,
        description: blog.description,
        name: blog.userId.name,
      }));

      const totalData = await Blog.countDocuments({ type: type });
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
      const type = req.user.appSource || "";

      const blog = await Blog.findOne({ _id: id, type: type }).populate(
        "userId",
      );
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
    const type = req.user.appSource || "";

    // Hitung data yang dilewati (skip)
    const skip = (page - 1) * limit;
    try {
      const userId = req.user.id;
      const blogs = await Blog.find({
        userId: userId,
        title: { $regex: search, $options: "i" },
        type: type,
      })
        .populate("userId")
        .skip(skip)
        .limit(limit)
        .sort({ date: -1 });

      if (blogs.length === 0) {
        return res.status(404).json({ success: false, message: "Blog kosong" });
      }

      const result = blogs.map((blog) => ({
        ...blog.toObject(), // jika pakai Mongoose
        id: blog._id,
        title: blog.title,
        date: blog.date.toISOString().split("T")[0],
        image: `uploads/${blog.image}`,
        description: blog.description,
        name: blog.userId.name,
      }));

      const totalData = await Blog.countDocuments({
        userId: userId,
        type: type,
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
      const type = req.user.appSource;
      let date = req.body.date;

      if (!userId) {
        return res
          .status(400)
          .json({ message: "User tidak ditemukan, silahkan login" });
      }

      if (type === "kesehatan" && !category) {
        return res.status(400).json({
          message: "category wajib untuk artikel kesehatan",
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

      const blog = new Blog({
        userId,
        image,
        title,
        date,
        description,
        type,
        category,
      });
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
      const userId = req.user?.id;

      const body = req.body || {};
      const type = req.user.appSource;

      if (Object.keys(body).length === 0 && !req.file) {
        return res.status(400).json({
          success: false,
          message: "Tidak ada data yang dikirim untuk update",
        });
      }

      const { title, date, description, category } = body;
      const blog = await Blog.findById(req.params.id);

      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog tidak ditemukan" });
      }

      if (blog.userId.toString() !== userId) {
        return res
          .status(403)
          .json({ success: false, message: "Anda tidak memiliki akses" });
      }

      blog.title = title || blog.title;
      blog.date = date || blog.date;
      blog.description = description || blog.description;
      blog.category = category || blog.category;

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
      const userId = req.user?.id;
      const blog = await Blog.findByIdAndDelete(req.params.id);

      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "Blog tidak ditemukan" });
      }

      if (blog.userId.toString() !== userId) {
        return res
          .status(403)
          .json({ success: false, message: "Anda tidak memiliki akses" });
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

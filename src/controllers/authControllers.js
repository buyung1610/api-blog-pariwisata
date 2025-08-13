const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const { validationResult } = require("express-validator");
const BlacklistToken = require("../models/blacklistToken");

const authControllers = {
  login: async (req, res) => {
    try {
      const { username, password } = req.body;
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
        res.status(400).json({ errors: shortErrors });
      }

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(401).json({ message: "Username tidak ditemukan" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "password salah" });
      }

      const payload = {
        id: user._id,
        username: user.username,
        nama: user.nama_user,
        role: user.role,
      };

      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1m" });

      res.json({
        success: true,
        message: "Login berhasil",
        token, 
        user: payload,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },

  register: async (req, res) => {
    try {
      const { name, username, password } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        // Ambil array semua error
        const allErrors = errors.array();

        // Simpan error pertama dari setiap field
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
        res.status(400).json({ errors: shortErrors });
      }

      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ message: "Username sudah digunakan" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ name, username, password: hashedPassword });
      await user.save();

      res.json({ success: true, message: "Registrasi berhasil" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },

  logout: async (req, res) => {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) return res.status(400).json({ message: "Token diperlukan" });

      const decoded = jwt.decode(token);
      if (!decoded || !decoded.exp) {
        return res.status(400).json({ message: "Token tidak valid" });
      }

      const expiredAt = new Date(decoded.exp * 1000); 

      await BlacklistToken.create({ token, expiredAt });

      res.json({ message: "Logout berhasil, token di-blacklist" });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ success: false, message: "Terjadi kesalahan server" });
    }
  },
};

module.exports = authControllers;

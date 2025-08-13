const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;
const BlacklistToken = require("../models/blacklistToken");

async function verifyToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Token tidak ditemukan" });

  const blacklisted = await BlacklistToken.findOne({ token });
  if (blacklisted) {
    return res.status(401).json({ message: "Token sudah di-blacklist" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token tidak valid" });
  }
}

module.exports = verifyToken;

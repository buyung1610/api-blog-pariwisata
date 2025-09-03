const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/connectDb");
const path = require("path")

connectDB();

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use(express.json()); // untuk application/json
app.use(express.urlencoded({ extended: true })); 

// Middleware
app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Folder statis untuk melihat gambar
app.use("/uploads", express.static(path.join(__dirname, "uploads"), {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
      res.setHeader("Content-Type", "image/jpeg");
    } else if (filePath.endsWith(".png")) {
      res.setHeader("Content-Type", "image/png");
    }
  }
}));

app.use(express.json());
app.use(morgan('dev'));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

const port = process.env.PORT;

app.listen(port, () => {
    console.log(`Example app listening at http://192.168.1.33:${port}`);
});
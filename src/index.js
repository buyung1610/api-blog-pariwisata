const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/connectDb");
const path = require("path");
const cron = require("node-cron");
const seedBlogs = require("./seeders/blogSeeder");

console.log("MONGODB_URI:", process.env.MONGODB_URI);

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI tidak terbaca");
  process.exit(1);
}

connectDB();

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use(express.json()); // untuk application/json
app.use(express.urlencoded({ extended: true }));

// Middleware
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Folder statis untuk melihat gambar
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        res.setHeader("Content-Type", "image/jpeg");
      } else if (filePath.endsWith(".png")) {
        res.setHeader("Content-Type", "image/png");
      }
    },
  }),
);

// Job jalan tiap jam 12
cron.schedule("0 0 * * *", async () => {
  console.log("Cron jalan:", new Date().toLocaleString());
  try {
    await seedBlogs(); // tunggu sampai selesai
  } catch (error) {
    console.error("Error di cron job:", error);
  }
});

app.use(express.json());
app.use(morgan("dev"));

app.use(express.json());
app.use("/auth", authRoutes);
app.use("/blog", blogRoutes);

const port = process.env.PORT;
const host = process.env.HOST || "localhost";

app.listen(port, "0.0.0.0", () => {
    console.log(`Server running on port ${port}`);
});

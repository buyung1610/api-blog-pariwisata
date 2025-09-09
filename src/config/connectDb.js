const mongoose = require("mongoose");
const seedBlogs = require("../seeders/blogSeeder");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB Connected");

        // await seedBlogs();
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
    }
};

module.exports = connectDB;
require("dotenv").config();

const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const connectDB = require("./src/database/db");
const User = require("./src/models/User");

const ADMIN = {
    fullName: "Administrator",
    email: "admin@sqms.com",
    password: "admin123",
    role: "admin",
};

const seedAdmin = async () => {
    try {
        // Connect to MongoDB
        await connectDB();

        console.log("Connected database:", mongoose.connection.name);
        console.log("Connected collection:", User.collection.name);

        const userCount = await User.countDocuments();
        const adminCount = await User.countDocuments({ role: "admin" });

        console.log("Number of users:", userCount);
        console.log("Number of admins:", adminCount);

        // Check if this admin already exists
        const existingAdmin = await User.findOne({ email: ADMIN.email });

        if (existingAdmin) {
            console.log("✅ Admin account already exists.");
            return;
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(ADMIN.password, 10);

        // Create admin
        await User.create({
            fullName: ADMIN.fullName,
            email: ADMIN.email,
            password: hashedPassword,
            role: ADMIN.role,
        });

        console.log("✅ Admin account created successfully.");
        console.log("------------------------------------");
        console.log("Admin Login Credentials");
        console.log("Email   :", ADMIN.email);
        console.log("Password:", ADMIN.password);
        console.log("------------------------------------");

    } catch (error) {
        console.error("❌ Failed to seed admin:");
        console.error(error);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
};

seedAdmin();
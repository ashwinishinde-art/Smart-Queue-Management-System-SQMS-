const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const registerUserService = async (userData) => {
    const { fullName, email, password } = userData;

    // Check required fields
    if (!fullName || !email || !password) {
        throw new Error("Please fill all fields");
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
        throw new Error("Email already registered");
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Always create a student account through the public registration API.
    const user = await User.create({
        fullName,
        email,
        password: hashedPassword,
        role: "student",
    });

    return {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
    };
};

const loginUserService = async (userData) => {
    const { email, password } = userData;

    // Check required fields
    if (!email || !password) {
        throw new Error("Please provide email and password");
    }

    // Find user
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
        throw new Error("Invalid email or password");
    }

    // Generate JWT
    const token = generateToken(user);

    return {
        token,
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            role: user.role,
        },
    };
};

module.exports = {
    registerUserService,
    loginUserService,
};
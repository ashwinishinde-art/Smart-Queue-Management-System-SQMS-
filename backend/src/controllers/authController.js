const {
    registerUserService,
    loginUserService,
} = require("../services/authService");

const registerUser = async (req, res) => {
    try {
        const user = await registerUserService(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user,
        });
    } catch (error) {
        const statusCode =
            error.message === "Email already registered" ? 409 : 400;

        return res.status(statusCode).json({
            success: false,
            message: error.message,
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const data = await loginUserService(req.body);

        return res.status(200).json({
            success: true,
            message: "Login successful",
            token: data.token,
            user: data.user,
        });
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};


const getProfile = async (req, res) => {
    return res.status(200).json({
        success: true,
        user: req.user,
    });
};

module.exports = {
    registerUser,
    loginUser,
    getProfile,
};
require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/database/db");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    console.log("Starting Server...");
    await connectDB();

    app.listen(PORT, () => {
        console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
};

startServer();
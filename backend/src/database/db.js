const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        const connectionOptions = {
            serverSelectionTimeoutMS: 5000,
        };

        if (process.env.MONGODB_DB_NAME) {
            connectionOptions.dbName = process.env.MONGODB_DB_NAME;
        }

        await mongoose.connect(process.env.MONGODB_URI, connectionOptions);

        console.log("✅ MongoDB Connected Successfully");
        console.log("Connected database name:", mongoose.connection.name);
    } catch (error) {
        console.error("❌ MongoDB Connection Failed");

        console.dir(error.reason, { depth: 5 });

        process.exit(1);
    }
};

module.exports = connectDB;
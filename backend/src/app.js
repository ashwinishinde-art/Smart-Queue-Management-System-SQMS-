const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const authRoutes = require("./routes/authRoutes");
const queueRoutes = require("./routes/queueRoutes");
const queueEntryRoutes = require("./routes/queueEntryRoutes");
const adminQueueRoutes = require("./routes/adminQueueRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/queues", queueEntryRoutes);
app.use("/api/admin", adminQueueRoutes);

// Test Route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "SQMS Backend is Running 🚀"
    });
});

module.exports = app;
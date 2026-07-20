const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const {
    callNextStudent,
    completeStudent,
    getDashboardStats,
    pauseQueue,
    resumeQueue,
    closeQueue,
} = require("../controllers/adminQueueController");

router.get("/dashboard", protect, adminOnly, getDashboardStats);

router.post("/queues/:queueId/call-next", protect, adminOnly, callNextStudent);

router.post("/queues/:queueId/complete", protect, adminOnly, completeStudent);

router.post("/queues/:queueId/pause", protect, adminOnly, pauseQueue);

router.post("/queues/:queueId/resume", protect, adminOnly, resumeQueue);

router.post("/queues/:queueId/close", protect, adminOnly, closeQueue);

module.exports = router;
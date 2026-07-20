const {
    callNextStudentService,
    completeStudentService,
    getDashboardStatsService,
    pauseQueueService,
    resumeQueueService,
    closeQueueService,
} = require("../services/adminQueueService");

const callNextStudent = async (req, res) => {
    try {
        const result = await callNextStudentService(req.params.queueId, req.user._id);

        res.status(200).json({
            success: true,
            message: "Next student called successfully",
            ...result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const completeStudent = async (req, res) => {
    try {
        const result = await completeStudentService(req.params.queueId, req.user._id);

        res.status(200).json({
            success: true,
            message: "Student service completed successfully",
            ...result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getDashboardStats = async (req, res) => {
    try {
        const dashboard = await getDashboardStatsService();

        res.status(200).json({
            success: true,
            dashboard,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const pauseQueue = async (req, res) => {
    try {
        const queue = await pauseQueueService(req.params.queueId);

        res.status(200).json({
            success: true,
            message: "Queue paused successfully",
            queue,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const resumeQueue = async (req, res) => {
    try {
        const queue = await resumeQueueService(req.params.queueId);

        res.status(200).json({
            success: true,
            message: "Queue resumed successfully",
            queue,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const closeQueue = async (req, res) => {
    try {
        const queue = await closeQueueService(req.params.queueId);

        res.status(200).json({
            success: true,
            message: "Queue closed successfully",
            queue,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    callNextStudent,
    completeStudent,
    getDashboardStats,
    pauseQueue,
    resumeQueue,
    closeQueue,
};
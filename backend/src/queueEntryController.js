const {
    joinQueueService,
    getQueueStatusService,
    leaveQueueService,
    getMyActiveQueuesService,
    getQueueHistoryService,
    getUserQueueStatsService,
    getNotificationsService,
    markNotificationsAsReadService,
} = require("../services/queueEntryService");

// Join Queue
const joinQueue = async (req, res) => {
    try {
        const { queueId } = req.params;

        const result = await joinQueueService(queueId, req.user._id);

        return res.status(201).json({
            success: true,
            message: "Joined queue successfully",
            ...result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Queue Status
const getQueueStatus = async (req, res) => {
    try {
        const { queueId } = req.params;

        const result = await getQueueStatusService(
            queueId,
            req.user._id
        );

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Leave Queue
const leaveQueue = async (req, res) => {
    try {
        const { queueId } = req.params;

        const result = await leaveQueueService(
            queueId,
            req.user._id
        );

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

// Get Current Active Queue
// Get My Active Queues
const getMyActiveQueues = async (req, res) => {
    try {
        const queues = await getMyActiveQueuesService(req.user._id);

        return res.status(200).json({
            success: true,
            queues,
        });
    } catch (error) {
        return res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};
// Get Queue History
const getQueueHistory = async (req, res) => {
    try {
        const history = await getQueueHistoryService(req.user._id);

        return res.status(200).json({
            success: true,
            history,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getUserQueueStats = async (req, res) => {
    try {
        const stats = await getUserQueueStatsService(req.user._id);

        return res.status(200).json({
            success: true,
            stats,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getNotifications = async (req, res) => {
    try {
        const result = await getNotificationsService(req.user._id);

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const markNotificationsAsRead = async (req, res) => {
    try {
        const result = await markNotificationsAsReadService(req.user._id);

        return res.status(200).json({
            success: true,
            ...result,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    joinQueue,
    getQueueStatus,
    getMyActiveQueues,
    leaveQueue,
    getQueueHistory,
    getUserQueueStats,
    getNotifications,
    markNotificationsAsRead,
};
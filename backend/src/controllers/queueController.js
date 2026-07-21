const {
    createQueueService,
    getAllQueuesService,
} = require("../services/queueService");

const createQueue = async (req, res) => {
    try {
        const queue = await createQueueService(req.body, req.user._id);

        return res.status(201).json({
            success: true,
            message: "Queue created successfully",
            queue,
        });
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

const getAllQueues = async (req, res) => {
    try {
        const queues = await getAllQueuesService();

        return res.status(200).json({
            success: true,
            count: queues.length,
            queues,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    createQueue,
    getAllQueues,
};
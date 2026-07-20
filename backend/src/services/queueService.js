const Queue = require("../models/Queue");

const createQueueService = async (queueData, userId) => {
    const {
        queueName,
        department,
        averageServiceTime,
    } = queueData;

    // Validation
    if (!queueName || !department) {
        throw new Error("Queue name and department are required");
    }

    // Create Queue
    const queue = await Queue.create({
        queueName,
        department,
        averageServiceTime: averageServiceTime || 5,
        createdBy: userId,
    });

    return queue;
};

const getAllQueuesService = async () => {
    const queues = await Queue.find()
        .populate("createdBy", "fullName email")
        .sort({ createdAt: -1 });

    return queues;
};

module.exports = {
    createQueueService,
    getAllQueuesService,
};
 
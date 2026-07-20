const Queue = require("../models/Queue");
const QueueEntry = require("../models/QueueEntry");
const Notification = require("../models/Notification");

const createNotification = async (userId, type, message, queueId = null) => {
    try {
        await Notification.create({
            user: userId,
            type,
            message,
            queueId,
        });
    } catch (error) {
        console.error("Notification creation failed", error);
    }
};

const joinQueueService = async (queueId, userId) => {
    // Check if queue exists
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // ==============================
    // Business Rule #1
    // Queue must be open
    // ==============================

    if (queue.status === "paused") {
        throw new Error(
            "Queue is paused. You cannot join at the moment."
        );
    }

    if (queue.status === "closed") {
        throw new Error(
            "Queue is closed. You cannot join."
        );
    }

    // Check if user is already in the queue
    const existingEntry = await QueueEntry.findOne({
        queue: queueId,
        user: userId,
        status: {
            $in: ["waiting", "serving"],
        },
    });

    if (existingEntry) {
        throw new Error("You are already in this queue");
    }

    // Find the last token issued
    const lastEntry = await QueueEntry.findOne({
        queue: queueId,
    }).sort({ tokenNumber: -1 });

    // Generate next token
    const nextToken = lastEntry ? lastEntry.tokenNumber + 1 : 1;

    // Create queue entry
    const queueEntry = await QueueEntry.create({
        queue: queueId,
        user: userId,
        tokenNumber: nextToken,
    });

    await createNotification(
        userId,
        "queue_joined",
        `You joined ${queue.queueName} successfully.`,
        queue._id
    );

    // Calculate position
    const position = await QueueEntry.countDocuments({
        queue: queueId,
        status: "waiting",
    });

    // Calculate estimated waiting time
    const estimatedWaitingTime =
        (position - 1) * queue.averageServiceTime;

    return {
        queueEntry,
        tokenNumber: nextToken,
        position,
        estimatedWaitingTime,
    };
};

const getQueueStatusService = async (queueId, userId) => {
    // Check if queue exists
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // Find user's queue entry
    const queueEntry = await QueueEntry.findOne({
        queue: queueId,
        user: userId,
    }).sort({ joinedAt: -1 });

    if (!queueEntry) {
        throw new Error("You have never joined this queue.");
    }

    // If service is completed
    if (queueEntry.status === "completed") {
        return {
            queueName: queue.queueName,
            tokenNumber: queueEntry.tokenNumber,
            status: "completed",
            message: "Your service has been completed.",
        };
    }

    // If queue was cancelled
    if (queueEntry.status === "cancelled") {
        return {
            queueName: queue.queueName,
            tokenNumber: queueEntry.tokenNumber,
            status: "cancelled",
            message: "You have left the queue.",
        };
    }

    // Calculate people ahead
    const peopleAhead = await QueueEntry.countDocuments({
        queue: queueId,
        status: "waiting",
        tokenNumber: {
            $lt: queueEntry.tokenNumber,
        },
    });

    // Calculate current position
    const position = peopleAhead + 1;

    // Calculate waiting time
    const estimatedWaitingTime =
        peopleAhead * queue.averageServiceTime;

    return {
        queueName: queue.queueName,
        tokenNumber: queueEntry.tokenNumber,
        status: queueEntry.status,
        position,
        peopleAhead,
        estimatedWaitingTime,
        currentToken: queue.currentToken,
    };
};

const leaveQueueService = async (queueId, userId) => {
    // Check if queue exists
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // Find active queue entry
    const queueEntry = await QueueEntry.findOne({
        queue: queueId,
        user: userId,
        status: {
            $in: ["waiting", "serving"],
        },
    });

    if (!queueEntry) {
        throw new Error("You are not in an active queue.");
    }

    // Prevent leaving while being served
    if (queueEntry.status === "serving") {
        throw new Error(
            "You cannot leave the queue while being served."
        );
    }

    // Cancel queue entry
    queueEntry.status = "cancelled";
    queueEntry.cancelledAt = new Date();

    await queueEntry.save();

    await createNotification(
        userId,
        "queue_cancelled",
        `You cancelled your visit to ${queue.queueName}.`,
        queue._id
    );

    return {
        tokenNumber: queueEntry.tokenNumber,
        status: queueEntry.status,
        message: "You have successfully left the queue.",
    };
};

const getMyActiveQueuesService = async (userId) => {
    // Find all active queue entries of the user
    const queueEntries = await QueueEntry.find({
        user: userId,
        status: {
            $in: ["waiting", "serving"],
        },
    })
        .populate("queue")
        .sort({ joinedAt: 1 });

    if (queueEntries.length === 0) {
        throw new Error("No active queues found.");
    }

    const activeQueues = [];

    for (const queueEntry of queueEntries) {
        const queue = queueEntry.queue;

        const peopleAhead = await QueueEntry.countDocuments({
            queue: queue._id,
            status: "waiting",
            tokenNumber: {
                $lt: queueEntry.tokenNumber,
            },
        });

        const position = peopleAhead + 1;

        const estimatedWaitingTime =
            peopleAhead * queue.averageServiceTime;

        activeQueues.push({
            queueId: queue._id,
            queueName: queue.queueName,
            tokenNumber: queueEntry.tokenNumber,
            status: queueEntry.status,
            position,
            peopleAhead,
            estimatedWaitingTime,
            currentToken: queue.currentToken,
        });
    }

    return activeQueues;
};

const getQueueHistoryService = async (userId) => {
    const history = await QueueEntry.find({
        user: userId,
        status: {
            $in: ["completed", "cancelled"],
        },
    })
        .populate("queue")
        .sort({ joinedAt: -1 });

    return history.map((entry) => ({
        queueId: entry.queue._id,
        queueName: entry.queue.queueName,
        tokenNumber: entry.tokenNumber,
        status: entry.status,
        joinedAt: entry.joinedAt,
        completedAt: entry.completedAt || entry.cancelledAt,
    }));
};

const getUserQueueStatsService = async (userId) => {
    const totalVisits = await QueueEntry.countDocuments({ user: userId });
    const completedVisits = await QueueEntry.countDocuments({
        user: userId,
        status: "completed",
    });

    return {
        totalVisits,
        completedVisits,
    };
};

const getNotificationsService = async (userId) => {
    const notifications = await Notification.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(20);

    const unreadCount = await Notification.countDocuments({ user: userId, isRead: false });

    return {
        notifications,
        unreadCount,
    };
};

const markNotificationsAsReadService = async (userId) => {
    await Notification.updateMany({ user: userId, isRead: false }, { isRead: true });

    return { success: true };
};

module.exports = {
    joinQueueService,
    getQueueStatusService,
    getMyActiveQueuesService,
    leaveQueueService,
    getQueueHistoryService,
    getUserQueueStatsService,
    getNotificationsService,
    markNotificationsAsReadService,
};
const Queue = require("../models/Queue");
const QueueEntry = require("../models/QueueEntry");
const Notification = require("../models/Notification");

const createAdminNotification = async (userId, type, message, queueId = null) => {
    try {
        await Notification.create({
            user: userId,
            type,
            message,
            queueId,
        });
    } catch (error) {
        console.error("Admin notification creation failed", error);
    }
};

// ================================
// Call Next Student
// ================================
const callNextStudentService = async (queueId, adminUserId = null) => {
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // Business Rule #2
    if (queue.status === "paused") {
        throw new Error("Queue is paused. Cannot call next student.");
    }

    if (queue.status === "closed") {
        throw new Error("Queue is closed. Cannot call next student.");
    }

    const nextStudent = await QueueEntry.findOne({
        queue: queueId,
        status: "waiting",
    })
        .sort({ tokenNumber: 1 })
        .populate("user", "fullName email");

    if (!nextStudent) {
        throw new Error("No students waiting in queue");
    }

    nextStudent.status = "serving";
    nextStudent.servedAt = new Date();

    await nextStudent.save();

    if (nextStudent.user?._id) {
        await createAdminNotification(
            nextStudent.user._id,
            "called_next",
            `It is now your turn in ${queue.queueName}.`,
            queue._id
        );
    }

    if (adminUserId) {
        await createAdminNotification(
            adminUserId,
            "called_next",
            `You called the next student in ${queue.queueName}.`,
            queue._id
        );
    }

    queue.currentToken = nextStudent.tokenNumber;
    await queue.save();

    return {
        currentToken: queue.currentToken,
        student: nextStudent,
    };
};

// ================================
// Complete Student Service
// ================================
const completeStudentService = async (queueId, adminUserId = null) => {
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // Business Rule #3
    if (queue.status === "paused") {
        throw new Error("Queue is paused. Cannot complete service.");
    }

    if (queue.status === "closed") {
        throw new Error("Queue is closed. Cannot complete service.");
    }

    const currentStudent = await QueueEntry.findOne({
        queue: queueId,
        status: "serving",
    }).populate("user", "fullName email");

    if (!currentStudent) {
        throw new Error("No student is currently being served");
    }

    currentStudent.status = "completed";
    currentStudent.completedAt = new Date();

    await currentStudent.save();

    if (currentStudent.user?._id) {
        await createAdminNotification(
            currentStudent.user._id,
            "service_completed",
            `Your service in ${queue.queueName} has been completed.`,
            queue._id
        );
    }

    if (adminUserId) {
        await createAdminNotification(
            adminUserId,
            "service_completed",
            `You completed service for ${queue.queueName}.`,
            queue._id
        );
    }

    return {
        completedStudent: currentStudent,
    };
};

// ================================
// Dashboard Statistics
// ================================
const getDashboardStatsService = async () => {
    const totalQueues = await Queue.countDocuments();

    const activeQueues = await Queue.countDocuments({
        status: "open",
    });

    const waitingStudents = await QueueEntry.countDocuments({
        status: "waiting",
    });

    const servingStudents = await QueueEntry.countDocuments({
        status: "serving",
    });

    const completedStudents = await QueueEntry.countDocuments({
        status: "completed",
    });

    const cancelledStudents = await QueueEntry.countDocuments({
        status: "cancelled",
    });

    return {
        totalQueues,
        activeQueues,
        waitingStudents,
        servingStudents,
        completedStudents,
        cancelledStudents,
    };
};

// ================================
// Pause Queue
// ================================
const pauseQueueService = async (queueId) => {
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    if (queue.status === "paused") {
        throw new Error("Queue is already paused");
    }

    if (queue.status === "closed") {
        throw new Error("Closed queue cannot be paused");
    }

    queue.status = "paused";
    await queue.save();

    const queueEntries = await QueueEntry.find({
        queue: queueId,
        status: { $in: ["waiting", "serving"] },
    }).populate("user", "fullName email");

    for (const entry of queueEntries) {
        if (entry.user?._id) {
            await createAdminNotification(
                entry.user._id,
                "queue_paused",
                `${queue.queueName} has been paused.`,
                queue._id
            );
        }
    }

    return queue;
};

// ================================
// Resume Queue
// ================================
const resumeQueueService = async (queueId) => {
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    if (queue.status === "open") {
        throw new Error("Queue is already open");
    }

    if (queue.status === "closed") {
        throw new Error("Closed queue cannot be resumed");
    }

    queue.status = "open";
    await queue.save();

    const queueEntries = await QueueEntry.find({
        queue: queueId,
        status: { $in: ["waiting", "serving"] },
    }).populate("user", "fullName email");

    for (const entry of queueEntries) {
        if (entry.user?._id) {
            await createAdminNotification(
                entry.user._id,
                "queue_resumed",
                `${queue.queueName} has been resumed.`,
                queue._id
            );
        }
    }

    return queue;
};

// ================================
// Close Queue
// ================================
const closeQueueService = async (queueId) => {
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    if (queue.status === "closed") {
        throw new Error("Queue is already closed");
    }

    queue.status = "closed";
    await queue.save();

    return queue;
};

module.exports = {
    callNextStudentService,
    completeStudentService,
    getDashboardStatsService,
    pauseQueueService,
    resumeQueueService,
    closeQueueService,
};
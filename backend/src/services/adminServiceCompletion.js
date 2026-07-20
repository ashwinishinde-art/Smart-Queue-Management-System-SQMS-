const Queue = require("../models/Queue");
const QueueEntry = require("../models/QueueEntry");

const completeStudentService = async (queueId) => {
    // Check if queue exists
    const queue = await Queue.findById(queueId);

    if (!queue) {
        throw new Error("Queue not found");
    }

    // Find the student currently being served
    const currentStudent = await QueueEntry.findOne({
        queue: queueId,
        status: "serving",
    }).populate("user", "fullName email");

    if (!currentStudent) {
        throw new Error("No student is currently being served");
    }

    // Mark service as completed
    currentStudent.status = "completed";

    await currentStudent.save();

    return {
        completedStudent: currentStudent,
    };
};

module.exports = {
    completeStudentService,
};
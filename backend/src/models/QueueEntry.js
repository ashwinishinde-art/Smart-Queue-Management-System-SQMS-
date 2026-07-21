const mongoose = require("mongoose");

const queueEntrySchema = new mongoose.Schema(
    {
        queue: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Queue",
            required: true,
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        tokenNumber: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            enum: ["waiting", "serving", "completed", "cancelled"],
            default: "waiting",
        },

        joinedAt: {
            type: Date,
            default: Date.now,
        },

        servedAt: {
            type: Date,
            default: null,
        },

        cancelledAt: {
            type: Date,
            default: null,
        },

        completedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("QueueEntry", queueEntrySchema);
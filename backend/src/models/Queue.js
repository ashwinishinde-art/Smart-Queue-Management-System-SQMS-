const mongoose = require("mongoose");

const queueSchema = new mongoose.Schema(
    {
        queueName: {
            type: String,
            required: true,
            trim: true,
        },

        department: {
            type: String,
            required: true,
            trim: true,
        },

    status: {
        type: String,
        enum: ["open", "paused", "closed"],
        default: "open",
    },

        averageServiceTime: {
            type: Number,
            default: 5,
        },

        currentToken: {
            type: Number,
            default: 0,
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Queue", queueSchema);
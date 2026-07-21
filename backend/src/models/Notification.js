const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: [
        "queue_joined",
        "queue_cancelled",
        "called_next",
        "service_completed",
        "queue_paused",
        "queue_resumed",
      ],
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    queueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Queue",
      default: null,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);

const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // prevent duplicate categories
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    // New field for soft deletion and TTL index
    deletedAt: {
      type: Date,
      default: null, // Initially null, meaning not deleted
      index: {
        expireAfterSeconds: 30 * 24 * 60 * 60, // 30 days in seconds
        partialFilterExpression: { deletedAt: { $exists: true, $ne: null } }, // Only apply TTL to documents where deletedAt is set
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Category", categorySchema);

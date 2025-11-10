const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    authorType: { type: String, enum: ["admin", "user"], default: "user" },
    isDeleted: { type: Boolean, default: false }, // soft delete flag
    deletedAt: { type: Date, default: null }, // timestamp for deletion
  },
  { timestamps: true }
);

// Automatically remove permanently deleted blogs after 30 days
blogSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 2592000 }); // 30 days (30 * 24 * 60 * 60)

module.exports = mongoose.model("Blog", blogSchema);

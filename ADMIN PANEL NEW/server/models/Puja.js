const mongoose = require("mongoose");

const PujaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      // required: true,
    },
    description: {
      type: String,
      // required: true,
    },
    // date: {
    //   type: Date,
    //   required: true,
    // },
    image: {
      type: String,
      default: "https://example.com/images/default.jpg",
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    significance: {
      type: String,
    },
    benefits: [
      {
        title: { type: String },
        detail: { type: String },
      },
    ],
    process: {
      type: String,
    },
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    reviews: [
      {
        user: { type: String },
        rating: { type: Number, max: 5 },
        comment: { type: String },
      },
    ],

    // 🆕 Soft delete fields
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Puja", PujaSchema);

const mongoose = require("mongoose");

const PujaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    shortDescription: {
      type: String,
      trim: true,
      maxlength: 300, // limit for meta/preview usage
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
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

    // ✅ SEO fields
    metaTitle: {
      type: String,
      trim: true,
      maxlength: 70,
    },
    metaDescription: {
      type: String,
      trim: true,
      maxlength: 160,
    },
    metaKeywords: {
      type: [String], // e.g., ["Ganesh Puja", "Hindu rituals"]
      default: [],
    },

    // ✅ Featured option
    isFeatured: {
      type: Boolean,
      default: false,
    },

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



// const mongoose = require("mongoose");

// const PujaSchema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     price: {
//       type: Number,
//       // required: true,
//     },
//     description: {
//       type: String,
//       // required: true,
//     },
//     image: {
//       type: String,
//       default: "https://example.com/images/default.jpg",
//     },
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     significance: {
//       type: String,
//     },
//     benefits: [
//       {
//         title: { type: String },
//         detail: { type: String },
//       },
//     ],
//     process: {
//       type: String,
//     },
//     faqs: [
//       {
//         question: { type: String },
//         answer: { type: String },
//       },
//     ],
//     reviews: [
//       {
//         user: { type: String },
//         rating: { type: Number, max: 5 },
//         comment: { type: String },
//       },
//     ],

//     // 🆕 Soft delete fields
//     isDeleted: {
//       type: Boolean,
//       default: false,
//     },
//     deletedAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Puja", PujaSchema);

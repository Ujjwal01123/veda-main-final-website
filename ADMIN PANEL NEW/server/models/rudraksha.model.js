const mongoose = require("mongoose");

const rudrakshaSchema = new mongoose.Schema(
  {
    stock: { type: Number, default: 0 },
    productName: { type: String, trim: true },
    productPrice: { type: Number },
    productDiscount: { type: Number, default: 0 },
    productImage: [{ type: String }],
    productPath: [{ type: String }],
    productAbout: { type: [String] },
    productFeatures: { type: [String] },
    productBenefits: { type: [String] },
    productFaqs: { type: [String] },
    productShipping: { type: [String] },
    shortDescription: { type: [String] },
    // shortDescription: {
    //   type: [String], // limit for meta/preview usage
    // },
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
    options: [
      {
        title: { type: String },
        price: { type: Number },
      },
    ],
    energization: [
      {
        title: { type: String },
        price: { type: Number },
        isHaveForm: { type: Boolean, default: false },
      },
    ],
    shopifyLink: { type: String, trim: true }, // Added
    youtubeLink: { type: String, trim: true }, // Added
    isDeleted: { type: Boolean, default: false },
    deletedAt: {
      type: Date,
      index: { expireAfterSeconds: 2592000 },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Rudraksha", rudrakshaSchema);

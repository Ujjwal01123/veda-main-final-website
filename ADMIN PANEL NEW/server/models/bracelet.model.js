const mongoose = require("mongoose");

const braceletSchema = new mongoose.Schema(
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
    energization: [
      {
        title: String,
        price: Number,
        isHaveForm: { type: Boolean, default: false },
      },
    ],
    sizes: [
      { size: String, price: Number, stock: { type: Number, default: 0 } },
    ],
    certificates: [
      {
        type: { type: String },
        price: { type: Number },
      },
    ],

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

    shopifyLink: { type: String, default: "" }, // <-- added
    youtubeLink: { type: String, default: "" }, // <-- added

    // Soft delete fields
    isDeleted: { type: Boolean, default: false },
    deletedAt: { type: Date },
  },
  { timestamps: true }
);

// TTL index: automatically delete documents 30 days after deletedAt
braceletSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model("Bracelet", braceletSchema);

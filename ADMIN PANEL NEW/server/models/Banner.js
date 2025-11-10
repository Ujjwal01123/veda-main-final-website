const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema(
  {
    sectionName: {
      type: String,
      required: true,
      enum: ["puja", "astrology", "rudraksha", "bracelet", "blog"],
    },
    images: [
      {
        imageUrl: { type: String, required: true },
        altText: { type: String, default: "" },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Banner", bannerSchema);

// const mongoose = require("mongoose");

// const bannerSchema = new mongoose.Schema(
//   {
//     sectionName: {
//       type: String,
//       required: true,
//       enum: ["puja", "astrology", "rudraksha", "bracelet", "blog"],
//     },
//     imageUrl: {
//       type: String,
//       required: true,
//     },
//     altText: {
//       type: String,
//       default: "",
//     },
//     isActive: {
//       type: Boolean,
//       default: true,
//     },
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("Banner", bannerSchema);

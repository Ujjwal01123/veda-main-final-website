const mongoose = require("mongoose");

const rudraSchema = new mongoose.Schema(
  {
    offerTitle: {
      type: String,
      required: true,
      trim: true,
    },
    offerDescription: {
      type: String,
      trim: true,
    },
    discountPercent: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    rudraksha: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Rudraksha", // your puja model name
      },
    ],
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rudraOffer", rudraSchema);

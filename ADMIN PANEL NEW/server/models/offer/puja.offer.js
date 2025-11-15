const mongoose = require("mongoose");

const OfferSchema = new mongoose.Schema(
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
    pujaTypes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category", // your category model name
      },
    ],
    pujaIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Puja", // your puja model name
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

module.exports = mongoose.model("Offer", OfferSchema);

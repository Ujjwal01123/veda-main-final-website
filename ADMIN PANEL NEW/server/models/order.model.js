const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactionId: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Rudraksha",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        energizationForm: {
          wearerName: String,
          dob: Date,
          birthPlace: String,
          time: String,
          gender: String,
          gotra: String,
          purpose: String,
        },
      },
    ],

    status: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Order = model("Order", orderSchema);

module.exports = Order;

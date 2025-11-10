const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const transactionSchema = new Schema(
  {
    amount: Number,
    amount_due: Number,
    amount_paid: Number,
    attempts: Number,
    currency: String,
    entity: String,
    id: String,
    notes: [],
    offer_id: { type: String, default: null },
    receipt: String,
    status: String,
    paymentId: String,
    signature: String,
  },
  { timestamps: true }
);

const Transaction = model("Transaction", transactionSchema);

module.exports = Transaction;

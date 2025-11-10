const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema(
  {
    item: {
      // Can be Puja, Rudraksha, Bracelet, etc.
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "itemType", // <-- dynamic reference
    },
    itemType: {
      type: String,
      required: true,
      enum: ["Puja", "Rudraksha", "Bracelet"], // list all models
    },

    name: { type: String, required: true },
    gotra: { type: String },
    rashi: { type: String },
    nakshatra: { type: String },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    amount: { type: Number, required: true },
    bookingDate: { type: Date, required: true },

    paymentId: { type: String },
    orderId: { type: String },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },

    // --- Soft delete fields ---
    isDeleted: {
      type: Boolean,
      default: false,
      index: true,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

// TTL Index for automatic hard deletion (30 days)
BookingSchema.index(
  { deletedAt: 1 },
  {
    // expireAfterSeconds: 30 * 24 * 60 * 60,
    expireAfterSeconds: 30,
    partialFilterExpression: { isDeleted: true },
  }
);

module.exports = mongoose.model("Booking", BookingSchema);

// // previous code

// const mongoose = require("mongoose");

// const BookingSchema = new mongoose.Schema(
//   {
//     puja: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Puja",
//       required: true,
//     },
//     name: { type: String, required: true },
//     gotra: { type: String },
//     rashi: { type: String },
//     nakshatra: { type: String },
//     phone: { type: String, required: true },
//     email: { type: String, required: true },
//     amount: { type: Number, required: true }, // Field for when puja will be performed

//     bookingDate: { type: Date, required: true }, // Payment fields

//     paymentId: { type: String },
//     orderId: { type: String },
//     paymentStatus: {
//       type: String,
//       enum: ["pending", "paid", "failed"],
//       default: "pending",
//     },

//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "cancelled"],
//       default: "pending",
//     }, // --- NEW SOFT DELETE FIELDS ---

//     isDeleted: {
//       type: Boolean,
//       default: false,
//       index: true,
//     },
//     deletedAt: {
//       type: Date,
//       default: null,
//     },
//   },
//   { timestamps: true }
// );

// // TTL Index for automatic hard deletion (30 days = 2592000 seconds)
// // This index only applies to documents where isDeleted is true.
// BookingSchema.index(
//   { deletedAt: 1 },
//   {
//     expireAfterSeconds: 30 * 24 * 60 * 60,
//     partialFilterExpression: { isDeleted: true },
//   }
// );

// module.exports = mongoose.model("Booking", BookingSchema);

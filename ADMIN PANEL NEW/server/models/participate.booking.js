const mongoose = require("mongoose");

// Participant sub-schema
const participantSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

// Main puja booking schema
const pujaBookingSchema = new mongoose.Schema(
  {
    formType: {
      type: String,
      enum: ["one_person", "two_people", "four_people", "six_people"],
      required: [true, "Form type is required"],
    },

    whatsappNumber: {
      type: String,
      required: [true, "WhatsApp number is required"],
      match: [/^\+91\d{10}$/, "Enter a valid WhatsApp number (+911234567890)"],
    },

    participants: {
      type: [participantSchema],
      validate: {
        validator: function (arr) {
          return arr.length > 0;
        },
        message: "At least one participant is required",
      },
    },

    gotra: {
      type: String,
      default: "",
    },
    dontKnowGotra: {
      type: Boolean,
      default: false,
    },

    // Prasad details (only if selected)
    prasadDelivery: {
      type: Boolean,
      default: false,
    },
    prasadType: {
      type: String,
      enum: ["Rudraksh", "Bracelet", "Full Packet"],
    },
    price: {
      type: Number,
    },
    fullName: String,
    fullAddress: String,
    city: String,
    pincode: String,

    // Soft delete fields
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

// ✅ Automatically remove permanently deleted records after 30 days
pujaBookingSchema.index({ deletedAt: 1 }, { expireAfterSeconds: 2592000 }); // 30 days = 30 * 24 * 60 * 60

// ✅ Optional performance indexes (for faster queries)
pujaBookingSchema.index({ whatsappNumber: 1 });
pujaBookingSchema.index({ formType: 1 });
pujaBookingSchema.index({ createdAt: -1 });

module.exports = mongoose.model("PujaBooking", pujaBookingSchema);

// // import mongoose from "mongoose";
// const mongoose = require("mongoose");

// // Participant sub-schema
// const participantSchema = new mongoose.Schema({
//   name: { type: String, required: true },
// });

// // Main puja booking schema
// const pujaBookingSchema = new mongoose.Schema(
//   {
//     formType: {
//       type: String,
//       enum: ["one_person", "two_people", "four_people", "six_people"],
//       required: [true, "Form type is required"],
//     },

//     whatsappNumber: {
//       type: String,
//       required: [true, "WhatsApp number is required"],
//       match: [/^\+91\d{10}$/, "Enter a valid WhatsApp number (+911234567890)"],
//     },

//     participants: {
//       type: [participantSchema],
//       validate: {
//         validator: function (arr) {
//           return arr.length > 0;
//         },
//         message: "At least one participant is required",
//       },
//     },

//     gotra: {
//       type: String,
//       default: "",
//     },
//     dontKnowGotra: {
//       type: Boolean,
//       default: false,
//     },

//     // Prasad details (only if selected)
//     prasadDelivery: {
//       type: Boolean,
//       default: false,
//     },
//     prasadType: {
//       type: String,
//       enum: ["Rudraksh", "Bracelet", "Full Packet"],
//     },
//     price: {
//       type: Number,
//     },
//     fullName: String,
//     fullAddress: String,
//     city: String,
//     pincode: String,
//   },
//   { timestamps: true }
// );

// module.exports = mongoose.model("PujaBooking", pujaBookingSchema);

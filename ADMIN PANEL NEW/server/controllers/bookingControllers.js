const Booking = require("../models/Booking");
const Puja = require("../models/Puja");
const Rudraksha = require("../models/rudraksha.model");
const Bracelet = require("../models/bracelet.model");
const Razorpay = require("razorpay");
require("dotenv").config();

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// -------------------- CREATE BOOKING --------------------
const createBooking = async (req, res) => {
  try {
    const {
      itemId,
      itemType,
      name,
      gotra,
      rashi,
      nakshatra,
      phone,
      email,
      bookingDate,
      amount,
    } = req.body; // Validate required fields

    if (
      !itemId ||
      !itemType ||
      !name ||
      !phone ||
      !email ||
      !bookingDate ||
      !amount
    ) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    console.log("Received booking data:", req.body);

    // Check if the referenced item exists
    let itemModel;
    if (itemType === "Puja") itemModel = Puja;
    else if (itemType === "Rudraksha") itemModel = Rudraksha;
    else if (itemType === "Bracelet") itemModel = Bracelet;
    else return res.status(400).json({ message: "Invalid item type" });

    const item = await itemModel.findById(itemId);
    if (!item)
      return res.status(404).json({ message: `${itemType} not found` });

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: amount * 100, // convert to paise
      currency: "INR",
      receipt: `${itemType.toLowerCase()}_${Date.now()}`,
    });

    // Save booking
    const booking = new Booking({
      item: itemId,
      itemType,
      name,
      gotra,
      rashi,
      nakshatra,
      phone,
      email,
      bookingDate,
      amount,
      orderId: order.id,
    });

    await booking.save();

    // Populate dynamically based on itemType
    await booking.populate({
      path: "item",
      select: "productName title description",
    });

    res.status(201).json({
      message: "Booking created successfully. Complete payment to confirm",
      booking,
      razorpayOrder: order,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- VERIFY PAYMENT --------------------
const verifyPayment = async (req, res) => {
  try {
    const { bookingId, paymentId } = req.body;
    if (!bookingId || !paymentId) {
      return res
        .status(400)
        .json({ message: "Booking ID and payment ID required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.paymentId = paymentId;
    booking.paymentStatus = "paid";
    booking.status = "confirmed";

    await booking.save();
    await booking.populate({ path: "item", select: "title description" });

    res.json({ message: "Payment verified & booking confirmed", booking });
  } catch (error) {
    console.error("Verify payment error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- GET UNIQUE DEVOTEES --------------------
const getUniqueDevotees = async (req, res) => {
  try {
    const bookings = await Booking.find({ isDeleted: false }).populate({
      path: "item",
      select: "title",
    });

    const uniqueDevoteesMap = new Map();

    bookings.forEach((booking) => {
      const identifier = `${booking.name}-${booking.email}-${booking.phone}`;
      const itemTitle = booking.item?.title || "Unknown";

      const bookingData = {
        itemTitle,
        bookingDate: booking.bookingDate,
        amount: booking.amount,
        bookingId: booking._id,
      };

      if (uniqueDevoteesMap.has(identifier)) {
        const devotee = uniqueDevoteesMap.get(identifier);
        devotee.bookingCount += 1;
        devotee.bookings.push(bookingData);
      } else {
        uniqueDevoteesMap.set(identifier, {
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          bookingCount: 1,
          bookings: [bookingData],
        });
      }
    });

    const uniqueDevotees = Array.from(uniqueDevoteesMap.values());
    res.status(200).json({ uniqueDevotees });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------- GET ALL BOOKINGS --------------------
const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ isDeleted: false }).populate({
      path: "item",
      select: "productName title description",
    });
    res.json(bookings);
  } catch (error) {
    console.error("Get all bookings error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- GET DRAFT BOOKINGS --------------------
const getDraftBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ isDeleted: true }).populate({
      path: "item",
      select: "productName title description",
    });
    res.json(bookings);
  } catch (error) {
    console.error("Get draft bookings error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- GET BOOKING BY ID --------------------
const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate({
      path: "item",
      select: "productName title description",
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    console.error("Get booking by ID error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- UPDATE BOOKING STATUS --------------------
const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: "Status is required" });

    const booking = await Booking.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false },
      { status },
      { new: true }
    ).populate({ path: "item", select: "productName title description" });

    if (!booking)
      return res.status(404).json({ message: "Active booking not found" });

    res.json(booking);
  } catch (error) {
    console.error("Update booking status error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- DELETE BOOKING (SOFT DELETE) --------------------
const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true, deletedAt: new Date() },
      { new: true }
    );

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking moved to draft/trash successfully", booking });
  } catch (error) {
    console.error("Soft delete booking error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- RESTORE BOOKING --------------------
const restoreBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { isDeleted: false, deletedAt: null },
      { new: true }
    ).populate({ path: "item", select: "productName title description" });

    if (!booking)
      return res.status(404).json({ message: "Draft booking not found" });

    res.json({ message: "Booking restored successfully", booking });
  } catch (error) {
    console.error("Restore booking error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- HARD DELETE BOOKING --------------------
const hardDeleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json({ message: "Booking permanently deleted successfully" });
  } catch (error) {
    console.error("Hard delete booking error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- GET ACTIVE BOOKINGS --------------------
const getActiveBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      isDeleted: false,
      status: { $in: ["pending", "confirmed"] },
      paymentStatus: { $in: ["paid", "pending"] },
    }).populate({ path: "item", select: "productName title description" });

    res.json(bookings);
  } catch (error) {
    console.error("Get active bookings error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- GET CANCELLED BOOKINGS --------------------
const getCancelledBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      isDeleted: false,
      status: "cancelled",
    }).populate({ path: "item", select: "productName title description" });

    res.json(bookings);
  } catch (error) {
    console.error("Get cancelled bookings error:", error);
    res.status(500).json({ message: error.message });
  }
};

// -------------------- GET MONTHLY REVENUE --------------------
const getMonthlyRevenue = async (year, month) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);

  const result = await Booking.aggregate([
    {
      $match: {
        isDeleted: false,
        paymentStatus: "paid",
        createdAt: { $gte: start, $lt: end },
      },
    },
    { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
  ]);

  return result.length ? result[0].totalRevenue : 0;
};

// -------------------- GET TOTAL REVENUE --------------------
const getTotalRevenue = async () => {
  const result = await Booking.aggregate([
    { $match: { isDeleted: false, paymentStatus: "paid" } },
    { $group: { _id: null, totalRevenue: { $sum: "$amount" } } },
  ]);

  return result.length ? result[0].totalRevenue : 0;
};

module.exports = {
  getTotalRevenue,
  createBooking,
  verifyPayment,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking,
  getActiveBookings,
  getCancelledBookings,
  getMonthlyRevenue,
  getUniqueDevotees,
  getDraftBookings,
  restoreBooking,
  hardDeleteBooking,
};

// previos code
// const Booking = require("../models/Booking");
// const Puja = require("../models/Puja");
// const Razorpay = require("razorpay");
// require("dotenv").config();

// // Razorpay instance
// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // -------------------- CREATE BOOKING --------------------
// const createBooking = async (req, res) => {
//   try {
//     const {
//       pujaId,
//       name,
//       gotra,
//       rashi,
//       nakshatra,
//       phone,
//       email,
//       bookingDate,
//       amount,
//     } = req.body; // Validate required fields

//     if (!pujaId || !name || !phone || !email || !bookingDate || !amount) {
//       return res.status(400).json({ message: "Required fields are missing" });
//     }

//     console.log("Received booking data:", req.body); // Check if puja exists

//     const puja = await Puja.findById(pujaId);
//     if (!puja) {
//       return res.status(404).json({ message: "Puja not found" });
//     } // Create Razorpay order

//     const order = await razorpay.orders.create({
//       amount: amount * 100, // convert to paise
//       currency: "INR",
//       receipt: `puja_${Date.now()}`,
//     }); // Save booking

//     const booking = new Booking({
//       puja: pujaId,
//       name,
//       gotra,
//       rashi,
//       nakshatra,
//       phone,
//       email,
//       bookingDate,
//       amount,
//       orderId: order.id,
//     });

//     await booking.save(); // Populate puja for response

//     await booking.populate("puja", "title description");

//     res.status(201).json({
//       message: "Booking created successfully. Complete payment to confirm",
//       booking,
//       razorpayOrder: order,
//     });
//   } catch (error) {
//     console.error("Create booking error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- VERIFY PAYMENT --------------------
// const verifyPayment = async (req, res) => {
//   try {
//     const { bookingId, paymentId } = req.body;
//     if (!bookingId || !paymentId) {
//       return res
//         .status(400)
//         .json({ message: "Booking ID and payment ID required" });
//     }

//     const booking = await Booking.findById(bookingId);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     booking.paymentId = paymentId;
//     booking.paymentStatus = "paid";
//     booking.status = "confirmed";

//     await booking.save();
//     await booking.populate("puja", "title description");

//     res.json({ message: "Payment verified & booking confirmed", booking });
//   } catch (error) {
//     console.error("Verify payment error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- GET UNIQUE DEVOTEES (EXCLUDES DRAFTS) --------------------
// const getUniqueDevotees = async (req, res) => {
//   try {
//     // Only fetch active bookings (isDeleted: false)
//     const bookings = await Booking.find({ isDeleted: false }).populate(
//       "puja",
//       "title"
//     ); // Use a Map to keep unique devotees and their bookings

//     const uniqueDevoteesMap = new Map();

//     bookings.forEach((booking) => {
//       const identifier = `${booking.name}-${booking.email}-${booking.phone}`;
//       const pujaTitle = booking.puja?.title || "Unknown Puja";

//       const bookingData = {
//         pujaTitle,
//         bookingDate: booking.bookingDate,
//         amount: booking.amount,
//         bookingId: booking._id,
//       };

//       if (uniqueDevoteesMap.has(identifier)) {
//         // If already exists, increment booking count and push booking details
//         const devotee = uniqueDevoteesMap.get(identifier);
//         devotee.bookingCount += 1;
//         devotee.bookings.push(bookingData);
//       } else {
//         // Add new devotee with initial booking count and first booking
//         uniqueDevoteesMap.set(identifier, {
//           name: booking.name,
//           email: booking.email,
//           phone: booking.phone,
//           bookingCount: 1,
//           bookings: [bookingData],
//         });
//       }
//     }); // Convert Map values to array

//     const uniqueDevotees = Array.from(uniqueDevoteesMap.values()); // Send the array of unique devotees with booking count + bookings

//     res.status(200).json({ uniqueDevotees });
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // -------------------- GET ALL BOOKINGS (EXCLUDES DRAFTS) --------------------
// const getAllBookings = async (req, res) => {
//   try {
//     // Only fetch active bookings
//     const bookings = await Booking.find({ isDeleted: false }).populate(
//       "puja",
//       "title description"
//     );
//     res.json(bookings);
//   } catch (error) {
//     console.error("Get all bookings error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- GET DRAFT/DELETED BOOKINGS (NEW) --------------------
// const getDraftBookings = async (req, res) => {
//   try {
//     // Only fetch soft-deleted bookings
//     const bookings = await Booking.find({ isDeleted: true }).populate(
//       "puja",
//       "title description"
//     );
//     res.json(bookings);
//   } catch (error) {
//     console.error("Get draft bookings error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- GET BOOKING BY ID (Active or Draft) --------------------
// const getBookingById = async (req, res) => {
//   try {
//     // Finds the booking regardless of its draft status
//     const booking = await Booking.findById(req.params.id).populate(
//       "puja",
//       "title description"
//     );
//     if (!booking) return res.status(404).json({ message: "Booking not found" });
//     res.json(booking);
//   } catch (error) {
//     console.error("Get booking by ID error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- UPDATE BOOKING STATUS --------------------
// const updateBookingStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     if (!status) return res.status(400).json({ message: "Status is required" }); // Ensure we only update active bookings

//     const booking = await Booking.findOneAndUpdate(
//       { _id: req.params.id, isDeleted: false },
//       { status },
//       { new: true }
//     ).populate("puja", "title description");

//     if (!booking)
//       return res.status(404).json({ message: "Active booking not found" });

//     res.json(booking);
//   } catch (error) {
//     console.error("Update booking status error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- DELETE BOOKING (SOFT DELETE) --------------------
// const deleteBooking = async (req, res) => {
//   try {
//     // Moves the booking to draft/trash
//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { isDeleted: true, deletedAt: new Date() },
//       { new: true }
//     );

//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     res.json({ message: "Booking moved to draft/trash successfully", booking });
//   } catch (error) {
//     console.error("Soft delete booking error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- RESTORE BOOKING (UNDO SOFT DELETE) (NEW) --------------------
// const restoreBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndUpdate(
//       req.params.id,
//       { isDeleted: false, deletedAt: null },
//       { new: true }
//     ).populate("puja", "title description");

//     if (!booking)
//       return res.status(404).json({ message: "Draft booking not found" });

//     res.json({ message: "Booking restored successfully", booking });
//   } catch (error) {
//     console.error("Restore booking error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- HARD DELETE BOOKING (PERMANENT) (NEW) --------------------
// const hardDeleteBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findByIdAndDelete(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     res.json({ message: "Booking permanently deleted successfully" });
//   } catch (error) {
//     console.error("Hard delete booking error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- GET ACTIVE BOOKINGS (EXCLUDES DRAFTS) --------------------
// const getActiveBookings = async (req, res) => {
//   try {
//     const today = new Date();
//     const bookings = await Booking.find({
//       isDeleted: false, // Exclude drafts
//       status: { $in: ["pending", "confirmed"] },
//       paymentStatus: { $in: ["paid", "pending"] },
//     })
//       .populate({
//         path: "puja", // Note: Filtering by puja date on the related document requires further handling
//       })
//       .then((bookings) => bookings); // Removed filter, better to handle in separate query if required

//     res.json(bookings);
//   } catch (error) {
//     console.error("Get active bookings error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- GET CANCELLED BOOKINGS (EXCLUDES DRAFTS) --------------------
// const getCancelledBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({
//       isDeleted: false,
//       status: "cancelled",
//     }).populate("puja", "title description");
//     res.json(bookings);
//   } catch (error) {
//     console.error("Get cancelled bookings error:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

// // -------------------- GET MONTHLY REVENUE (EXCLUDES DRAFTS) --------------------
// const getMonthlyRevenue = async (year, month) => {
//   const start = new Date(year, month - 1, 1);
//   const end = new Date(year, month, 1);

//   const result = await Booking.aggregate([
//     {
//       $match: {
//         isDeleted: false, // Exclude drafts
//         paymentStatus: "paid",
//         createdAt: { $gte: start, $lt: end },
//       },
//     },
//     {
//       $group: { _id: null, totalRevenue: { $sum: "$amount" } },
//     },
//   ]);

//   return result.length ? result[0].totalRevenue : 0;
// };

// const getTotalRevenue = async () => {
//   const result = await Booking.aggregate([
//     {
//       $match: {
//         isDeleted: false, // Exclude drafts
//         paymentStatus: "paid", // Only paid bookings
//       },
//     },
//     {
//       $group: { _id: null, totalRevenue: { $sum: "$amount" } },
//     },
//   ]);

//   return result.length ? result[0].totalRevenue : 0;
// };

// module.exports = {
//   getTotalRevenue,
//   createBooking,
//   verifyPayment,
//   getAllBookings,
//   getBookingById,
//   updateBookingStatus,
//   deleteBooking, // Now soft delete
//   getActiveBookings,
//   getCancelledBookings,
//   getMonthlyRevenue,
//   getUniqueDevotees, // NEW EXPORTS

//   getDraftBookings,
//   restoreBooking,
//   hardDeleteBooking,
// };

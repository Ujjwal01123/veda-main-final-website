const express = require("express");
const router = express.Router();

const {
  createBooking,
  getAllBookings,
  getBookingById,
  updateBookingStatus,
  deleteBooking, // Soft delete
  verifyPayment,
  getActiveBookings,
  getCancelledBookings,
  getMonthlyRevenue,
  getUniqueDevotees, // NEWLY ADDED CONTROLLERS
  getDraftBookings,
  restoreBooking,
  hardDeleteBooking,
  getTotalRevenue,
} = require("../controllers/bookingControllers");

// ------------------------------------------------------------------
// --- STANDARD BOOKING ROUTES ---
// ------------------------------------------------------------------

// Create a booking (Puja, Rudraksha, Bracelet, etc.)
router.post("/", createBooking);

// Get all active bookings
router.get("/", getAllBookings);

// Verify Razorpay payment
router.post("/verify", verifyPayment);

// ------------------------------------------------------------------
// --- ANALYTIC / STATUS ROUTES ---
// ------------------------------------------------------------------

// Get unique devotees (excluding drafts)
router.get("/totaldevotees", getUniqueDevotees);

// Get active bookings (status: pending or confirmed)
router.get("/status/active", getActiveBookings);

// Get cancelled bookings
router.get("/status/cancel", getCancelledBookings);

// Get monthly revenue
// Usage: /revenue/monthly?year=2025&month=10
router.get("/revenue/monthly", async (req, res) => {
  try {
    let { year, month } = req.query;
    const now = new Date();
    year = year ? parseInt(year) : now.getFullYear();
    month = month ? parseInt(month) : now.getMonth() + 1;

    const totalRevenue = await getMonthlyRevenue(year, month);
    res.json({ year, month, totalRevenue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get total revenue across all bookings
router.get("/revenue/total", async (req, res) => {
  try {
    const totalRevenue = await getTotalRevenue();
    res.json({ totalRevenue });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ------------------------------------------------------------------
// --- DRAFT/TRASH MANAGEMENT ROUTES (Soft-deleted bookings) ---
// ------------------------------------------------------------------

// Get all soft-deleted bookings (draft/trash)
router.get("/draft", getDraftBookings);

// Restore a soft-deleted booking
router.put("/restore/:id", restoreBooking);

// Hard delete a booking permanently
router.delete("/hard/:id", hardDeleteBooking);

// ------------------------------------------------------------------
// --- DYNAMIC ID ROUTES (MUST BE LAST) ---
// ------------------------------------------------------------------

// Get a booking by ID (active or draft)
router.get("/:id", getBookingById);

// Update booking status (only active bookings)
router.put("/:id", updateBookingStatus);

// Soft delete a booking (moves to draft/trash)
router.delete("/:id", deleteBooking);

module.exports = router;

// // previous code
// const express = require("express");

// const router = express.Router();

// const {
//   createBooking,
//   getAllBookings,
//   getBookingById,
//   updateBookingStatus,
//   deleteBooking, // Now soft delete
//   verifyPayment,
//   getActiveBookings,
//   getCancelledBookings,
//   getMonthlyRevenue,
//   getUniqueDevotees, // NEWLY ADDED CONTROLLERS

//   getDraftBookings,
//   restoreBooking,
//   hardDeleteBooking,
//   getTotalRevenue,
// } = require("../controllers/bookingControllers");

// // --- Standard Collection Routes ---
// router.post("/", createBooking); // Book puja
// router.get("/", getAllBookings); // All active bookings
// router.post("/verify", verifyPayment); // Verify Payment

// // --- Analytic/Status Routes ---
// router.get("/totaldevotees", getUniqueDevotees);
// router.get("/status/active", getActiveBookings);
// router.get("/status/cancel", getCancelledBookings);
// // Route: /revenue/monthly?year=2025&month=10
// router.get("/revenue/monthly", async (req, res) => {
//   try {
//     let { year, month } = req.query;

//     const now = new Date();
//     year = year ? parseInt(year) : now.getFullYear();
//     month = month ? parseInt(month) : now.getMonth() + 1; // JS month is 0-based

//     const totalRevenue = await getMonthlyRevenue(year, month);

//     res.json({ year, month, totalRevenue });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // ------------------------------------------------------------------
// // --- DRAFT/TRASH MANAGEMENT ROUTES (MUST BE BEFORE /:id) ---
// // ------------------------------------------------------------------

// // GET all soft-deleted bookings (Draft/Trash)
// router.get("/draft", getDraftBookings);

// router.get("/revenue/total", async (req, res) => {
//   try {
//     const totalRevenue = await getTotalRevenue();
//     res.json({ totalRevenue });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // PUT request to restore a soft-deleted booking
// router.put("/restore/:id", restoreBooking);

// // DELETE request for permanent removal (Hard Delete)
// router.delete("/hard/:id", hardDeleteBooking);

// // ------------------------------------------------------------------
// // --- DYNAMIC ID ROUTES (MUST BE LAST) ---
// // ------------------------------------------------------------------

// router.get("/:id", getBookingById); // Single booking (active or draft)
// router.put("/:id", updateBookingStatus); // Update status (only active bookings)
// router.delete("/:id", deleteBooking); // Now performs SOFT delete

// module.exports = router;

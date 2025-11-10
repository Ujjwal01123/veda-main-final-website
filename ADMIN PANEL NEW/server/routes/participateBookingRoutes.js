// import express from "express";
const express = require("express");
const {
  createPujaBooking,
  getAllBookings,
  getBookingById,
  updatePujaBooking,
  softDeleteBooking,
  hardDeleteBooking,
  restoreDeletedBooking,
} = require("../controllers/participateBookingController");

const router = express.Router();

router.post("/", createPujaBooking);
router.get("/", getAllBookings);
router.patch("/soft-delete/:id", softDeleteBooking);
router.delete("/hard-delete/:id", hardDeleteBooking);
router.patch("/restore/deleted/:id", restoreDeletedBooking);
router.get("/:id", getBookingById);
router.put("/:id", updatePujaBooking);

module.exports = router;

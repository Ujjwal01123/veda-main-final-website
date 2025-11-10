// import PujaBooking from "../models/pujaBooking.model.js";
const PujaBooking = require("../models/participate.booking");

// CREATE BOOKING
const createPujaBooking = async (req, res) => {
  try {
    const {
      formType,
      whatsappNumber,
      participants,
      gotra,
      dontKnowGotra,
      prasadDelivery,
      prasadType,
      fullName,
      fullAddress,
      city,
      pincode,
    } = req.body;

    // ✅ Validate participant count based on form type
    const allowedCounts = {
      one_person: 1,
      two_people: 2,
      four_people: 4,
      six_people: 6,
    };

    const expectedCount = allowedCounts[formType];
    if (!expectedCount) {
      return res.status(400).json({
        success: false,
        message: "Invalid form type",
      });
    }

    if (!participants || participants.length !== expectedCount) {
      return res.status(400).json({
        success: false,
        message: `Expected ${expectedCount} participants for ${formType.replace(
          "_",
          " "
        )} form.`,
      });
    }

    // ✅ Determine price based on prasad type
    let price = 0;
    if (prasadDelivery) {
      switch (prasadType) {
        case "Rudraksh":
          price = 199;
          break;
        case "Bracelet":
          price = 299;
          break;
        case "Full Packet":
          price = 449;
          break;
      }
    }

    // ✅ Create new booking
    const booking = new PujaBooking({
      formType,
      whatsappNumber,
      participants,
      gotra,
      dontKnowGotra,
      prasadDelivery,
      prasadType: prasadDelivery ? prasadType : undefined,
      fullName: prasadDelivery ? fullName : undefined,
      fullAddress: prasadDelivery ? fullAddress : undefined,
      city: prasadDelivery ? city : undefined,
      pincode: prasadDelivery ? pincode : undefined,
      price,
    });

    await booking.save();

    res.status(201).json({
      success: true,
      message: "Puja booking created successfully.",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating booking",
      error: error.message,
    });
  }
};

// GET ALL BOOKINGS (ADMIN)
const getAllBookings = async (req, res) => {
  try {
    const bookings = await PujaBooking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET SINGLE BOOKING
const getBookingById = async (req, res) => {
  try {
    const booking = await PujaBooking.findById(req.params.id);
    if (!booking)
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });

    res.status(200).json({ success: true, data: booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✨ UPDATE BOOKING
const updatePujaBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      formType,
      whatsappNumber,
      participants,
      gotra,
      dontKnowGotra,
      prasadDelivery,
      prasadType,
      fullName,
      fullAddress,
      city,
      pincode,
    } = req.body;

    // ✅ Validate participant count based on form type
    const allowedCounts = {
      one_person: 1,
      two_people: 2,
      four_people: 4,
      six_people: 6,
    };

    const expectedCount = allowedCounts[formType];
    if (
      expectedCount &&
      participants &&
      participants.length !== expectedCount
    ) {
      return res.status(400).json({
        success: false,
        message: `Expected ${expectedCount} participants for ${formType.replace(
          "_",
          " "
        )} form.`,
      });
    }

    // ✅ Determine price again (in case prasad type changed)
    let price = 0;
    if (prasadDelivery) {
      switch (prasadType) {
        case "Rudraksh":
          price = 199;
          break;
        case "Bracelet":
          price = 299;
          break;
        case "Full Packet":
          price = 449;
          break;
      }
    }

    const updatedBooking = await PujaBooking.findByIdAndUpdate(
      id,
      {
        formType,
        whatsappNumber,
        participants,
        gotra,
        dontKnowGotra,
        prasadDelivery,
        prasadType: prasadDelivery ? prasadType : undefined,
        fullName: prasadDelivery ? fullName : undefined,
        fullAddress: prasadDelivery ? fullAddress : undefined,
        city: prasadDelivery ? city : undefined,
        pincode: prasadDelivery ? pincode : undefined,
        price,
      },
      { new: true, runValidators: true }
    );

    if (!updatedBooking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking updated successfully.",
      data: updatedBooking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating booking",
      error: error.message,
    });
  }
};

// 🩶 SOFT DELETE BOOKING
const softDeleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await PujaBooking.findById(id);

    if (!booking || booking.isDeleted) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    booking.isDeleted = true;
    booking.deletedAt = new Date();

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking soft deleted successfully.",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error soft deleting booking",
      error: error.message,
    });
  }
};

// ❌ HARD DELETE BOOKING (Permanent)
const hardDeleteBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await PujaBooking.findByIdAndDelete(id);

    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    res.status(200).json({
      success: true,
      message: "Booking permanently deleted.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error permanently deleting booking",
      error: error.message,
    });
  }
};

// ♻️ RESTORE SOFT-DELETED BOOKING
const restoreDeletedBooking = async (req, res) => {
  try {
    const id = req.params.id;
    const booking = await PujaBooking.findById(id);

    if (!booking) {
      return res
        .status(404)
        .json({ success: false, message: "Booking not found" });
    }

    if (!booking.isDeleted) {
      return res.status(400).json({
        success: false,
        message: "Booking is not deleted",
      });
    }

    booking.isDeleted = false;
    booking.deletedAt = null;

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking restored successfully.",
      data: booking,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error restoring booking",
      error: error.message,
    });
  }
};

module.exports = {
  createPujaBooking,
  getAllBookings,
  getBookingById,
  updatePujaBooking,
  softDeleteBooking,
  hardDeleteBooking,
  restoreDeletedBooking,
};

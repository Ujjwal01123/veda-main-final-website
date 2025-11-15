const Offer = require("../../models/offer/puja.offer.js");

// ✅ CREATE new offer
const createOffer = async (req, res) => {
  try {
    const offer = new Offer(req.body);
    await offer.save();
    res.status(201).json({
      success: true,
      message: "Offer created successfully",
      offer,
    });
  } catch (error) {
    console.error("Error creating offer:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET all offers
const getAllOffers = async (req, res) => {
  try {
    const offers = await Offer.find()
      .populate("pujaTypes", "name")
      .populate("pujaIds", "title");
    res.status(200).json({
      success: true,
      count: offers.length,
      offers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ GET single offer by ID
const getOfferById = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id)
      .populate("pujaTypes", "name")
      .populate("pujaIds", "title");
    if (!offer)
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });
    res.status(200).json({ success: true, offer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ UPDATE offer
const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .populate("pujaTypes", "name")
      .populate("pujaIds", "title");

    if (!offer)
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });

    res.status(200).json({
      success: true,
      message: "Offer updated successfully",
      offer,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ DELETE offer
const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer)
      return res
        .status(404)
        .json({ success: false, message: "Offer not found" });

    res.status(200).json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const toggleOfferStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Set all offers inactive first
    await Offer.updateMany({}, { isActive: false });

    // Then set selected offer active
    const updated = await Offer.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    res.json({
      success: true,
      message: "Offer status updated",
      offer: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
};

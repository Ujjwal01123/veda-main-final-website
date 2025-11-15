const rudraOffer = require("../../models/offer/rudraksha.offer");

// ✅ CREATE new offer
const createOffer = async (req, res) => {
  try {
    const offer = new rudraOffer(req.body);
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
    const offers = await rudraOffer
      .find()
      .populate("rudraksha", "productName stock price");
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
    const offer = await rudraOffer
      .findById(req.params.id)
      .populate("rudraksha", "productName stock price");
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
    const offer = await rudraOffer
      .findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      })
      .populate("rudraksha", "productName stock price");

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
    const offer = await rudraOffer.findByIdAndDelete(req.params.id);
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
    await rudraOffer.updateMany({}, { isActive: false });

    // Then set selected offer active
    const updated = await rudraOffer.findByIdAndUpdate(
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

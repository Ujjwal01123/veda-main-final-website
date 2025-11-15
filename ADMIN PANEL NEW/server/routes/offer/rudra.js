const express = require("express");
const {
  createOffer,
  getAllOffers,
  getOfferById,
  updateOffer,
  deleteOffer,
  toggleOfferStatus,
} = require("../../controllers/offers/rudra.offer");

const router = express.Router();

// Base URL: /api/offers
router.post("/create", createOffer);
router.get("/all", getAllOffers);
router.get("/:id", getOfferById);
router.put("/update/:id", updateOffer);
router.delete("/delete/:id", deleteOffer);
router.patch("/toggle/:id", toggleOfferStatus);

module.exports = router;

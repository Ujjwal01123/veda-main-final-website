const express = require("express");
const { multerUpload } = require("../utils/multer");
const {
  addBracelet,
  getBracelet,
  getBraceletById,
  updateBracelet,
  softDeleteBracelet,
  hardDeleteBracelet,
  getDrafts,
  restoreBracelet,
} = require("../controllers/bracelet.controller");

const router = express.Router();

router
  .route("/")
  .post(multerUpload.array("image", 10), addBracelet)
  .get(getBracelet);

router.route("/drafts").get(getDrafts);

router
  .route("/:id")
  .get(getBraceletById)
  .put(multerUpload.array("images", 10), updateBracelet)
  .delete(softDeleteBracelet); // soft delete

// Dedicated Soft Delete route
router.route("/soft-delete/:id").put(softDeleteBracelet);

// Restore soft deleted bracelet
router.route("/restore/:id").put(restoreBracelet);

router.route("/:id/hard-delete").delete(hardDeleteBracelet);

module.exports = router;

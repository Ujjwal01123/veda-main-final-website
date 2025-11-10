const express = require("express");
const router = express.Router();
const {
  createCategory,
  getAllCategories,
  // createCategoriesInBulk,
  // updateCategoriesInBulk,
  // deleteCategoriesInBulk,
  getCategoriesById,
  updateCategoriesById,
  deleteCategoriesById, // Now soft delete
  hardDeleteCategory, // NEW
  restoreCategory, // NEW
  getDraftCategories, // NEW
} = require("../controllers/categoryControllers");

// CREATE category
router.post("/", createCategory);

// READ all active categories
router.get("/all", getAllCategories);

// NEW: READ all soft-deleted categories (The Draft/Trash)
router.get("/draft", getDraftCategories);

//  BULK CREATE categories
// router.post("/bulk", createCategoriesInBulk);

// BULK UPDATE categories
// router.put("/bulk", updateCategoriesInBulk);

//  BULK DELETE categories (Uses deleteMany, so permanent/hard delete)
// router.delete("/bulk", deleteCategoriesInBulk);

// READ single category
router.get("/:id", getCategoriesById);

// UPDATE category
router.put("/:id", updateCategoriesById);

// --------------------------------------------------
// SOFT DELETE category (Triggers 30-day countdown)
router.delete("/:id", deleteCategoriesById); // Original DELETE route now performs SOFT delete

// --------------------------------------------------
// NEW: Hard Delete category (Permanent, bypasses TTL)
router.delete("/hard/:id", hardDeleteCategory);

// NEW: Restore category (Before 30 days expire)
router.put("/restore/:id", restoreCategory);

module.exports = router;

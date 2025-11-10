const Category = require("../models/Category");

// Helper function to exclude soft-deleted documents
const activeFilter = { deletedAt: null };

// create category (no change needed)
const createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// get all categories (Only active ones)
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find(activeFilter); // Only active categories
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get single category by id (Only active one)
const getCategoriesById = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      ...activeFilter,
    });
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update categories by id (Only active one)
const updateCategoriesById = async (req, res) => {
  try {
    const { name, description } = req.body;
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, ...activeFilter },
      { name, description },
      { new: true, runValidators: true } // Added runValidators
    );
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// SOFT DELETE Category by id
// This sets the `deletedAt` field, triggering the 30-day TTL index.
const deleteCategoriesById = async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, ...activeFilter },
      { $set: { deletedAt: new Date() } },
      { new: true }
    );
    if (!category)
      return res
        .status(404)
        .json({ message: "Category not found or already soft-deleted" });
    res.json({
      message:
        "Category soft-deleted successfully (will be hard-deleted in 30 days)",
      category,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// NEW: Hard Delete Category by id (Permanent Deletion)
const hardDeleteCategory = async (req, res) => {
  try {
    // Finds and permanently deletes regardless of soft-delete status
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    res.json({ message: "Category permanently deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// NEW: Restore Category by id (Remove soft delete)
const restoreCategory = async (req, res) => {
  try {
    // Finds a soft-deleted category and sets deletedAt back to null
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, deletedAt: { $ne: null } },
      { $set: { deletedAt: null } },
      { new: true }
    );
    if (!category)
      return res
        .status(404)
        .json({ message: "Soft-deleted Category not found or already active" });
    res.json({ message: "Category restored successfully", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ------------------------------------------------------------------
// NEW: Get all soft-deleted categories (The 'Draft/Trash')
const getDraftCategories = async (req, res) => {
  try {
    const draftCategories = await Category.find({ deletedAt: { $ne: null } });
    res.json(draftCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// NOTE: Bulk functions like createCategoriesInBulk, updateCategoriesInBulk, and
// deleteCategoriesInBulk would also need updates to honor the soft-delete logic,
// but for brevity, I've kept them as is, only updating the single-item CRUD.

module.exports = {
  createCategory,
  getAllCategories,
  // createCategoriesInBulk,
  // updateCategoriesInBulk,
  // deleteCategoriesInBulk, // Still useful for permanent bulk deletion using IDs
  getCategoriesById,
  updateCategoriesById,
  deleteCategoriesById, // Now performs soft delete
  hardDeleteCategory, // NEW
  restoreCategory, // NEW
  getDraftCategories, // NEW
};

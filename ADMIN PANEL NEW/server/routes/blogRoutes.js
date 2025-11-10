const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  createBlog,
  getAllBlogs,
  getBlog,
  updateBlog,
  softDeleteBlog,
  hardDeleteBlog,
  getDeletedBlogs,
  restoreBlog,
} = require("../controllers/blogController");

// 🖼 Configure Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/blogs"),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// 🛣 Routes
router.post("/", upload.single("image"), createBlog);
router.get("/", getAllBlogs);
router.get("/trash", getDeletedBlogs); // 🆕 Fetch soft-deleted blogs
router.get("/:id", getBlog);
router.put("/:id", upload.single("image"), updateBlog);
router.delete("/soft/:id", softDeleteBlog); // 🆕 Soft delete route
router.delete("/hard/:id", hardDeleteBlog); // 🆕 Permanent delete
router.put("/restore/:id", restoreBlog); // Restore soft-deleted blog

module.exports = router;

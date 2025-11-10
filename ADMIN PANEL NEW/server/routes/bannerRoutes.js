const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addOrUpdateBanner,
  getAllBanners,
  getBannerBySection,
  deleteBanner,
} = require("../controllers/bannerController");

const router = express.Router();

// 🧩 Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/banners");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// ✅ Allow up to 6 images (controller will validate min/max)
const upload = multer({
  storage,
  limits: { files: 6 },
});

// 📤 Add or Update Banner (up to 6 images)
router.post("/", upload.array("images", 6), addOrUpdateBanner);

// 📥 Get all banners
router.get("/", getAllBanners);

// 📄 Get banner by section name
router.get("/:sectionName", getBannerBySection);

// ❌ Delete banner
router.delete("/:id", deleteBanner);

module.exports = router;

// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const {
//   addOrUpdateBanner,
//   getAllBanners,
//   getBannerBySection,
//   deleteBanner,
// } = require("../controllers/bannerController");

// const router = express.Router();

// // 🧩 Multer Storage Configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/banners");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + path.extname(file.originalname));
//   },
// });

// const upload = multer({
//   storage,
//   limits: { files: 3 }, // Max 3, validated in controller to be exactly 3
// });

// // 📤 Add or Update Banner (exactly 3 images)
// router.post("/", upload.array("images", 6), addOrUpdateBanner);

// // 📥 Get all banners
// router.get("/", getAllBanners);

// // 📄 Get banner by section name
// router.get("/:sectionName", getBannerBySection);

// // ❌ Delete banner
// router.delete("/:id", deleteBanner);

// module.exports = router;

// const express = require("express");
// const multer = require("multer");
// const path = require("path");
// const {
//   addOrUpdateBanner,
//   getAllBanners,
//   getBannerBySection,
//   deleteBanner,
// } = require("../controllers/bannerController");

// const router = express.Router();

// // Storage configuration (same style as puja)
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/banners"); // Folder for banners
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

// // Upload or update banner (single image)
// router.post("/", upload.single("image"), addOrUpdateBanner);

// // Get all banners
// router.get("/", getAllBanners);

// // Get banner by section
// router.get("/:sectionName", getBannerBySection);

// // Delete banner
// router.delete("/:id", deleteBanner);

// module.exports = router;

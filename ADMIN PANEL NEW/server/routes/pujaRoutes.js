const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  getAllPujas,
  getSinglePujaById,
  createNewPuja,
  updatePujaById,
  deletePujaById,
  restorePuja,
  getDeletedPujas,
  getPujaByCategories,
  getUpcomingPuja,
  hardDeletePujaById,
} = require("../controllers/pujaControllers");

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/pujas");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
router.get("/all", getAllPujas);
router.get("/upcomingPuja", getUpcomingPuja);
router.get("/getPujaByCategory/:categoryId", getPujaByCategories);
router.get("/deleted", getDeletedPujas); // 🆕 get deleted pujas
router.post("/", upload.single("image"), createNewPuja);
router.put("/:id", upload.single("image"), updatePujaById);
router.delete("/:id", deletePujaById);
router.delete("/hard-delete/:id", hardDeletePujaById);
router.put("/restore/:id", restorePuja); // 🆕 restore deleted puja
router.get("/:id", getSinglePujaById);

module.exports = router;

const express = require("express");
const {
  addRudraksha,
  deleteRudraksha, // Now soft-delete
  getRudraksha,
  getRudrakshaById,
  updateRudraksha,
  getDraftRudraksha, // New
  restoreRudraksha, // New
  hardDeleteRudraksha, // New
} = require("../controllers/rudraksha.controller");

const multer = require("multer");

// configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/rudraksha"); // folder to save images
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const rudrakshaRouter = express.Router();

// --- Routes for Active Products ---
rudrakshaRouter.get("/draft", getDraftRudraksha);

rudrakshaRouter
  .route("/")
  .post(
    // accessController("user", "admin"),
    upload.array("images", 10),
    addRudraksha
  )
  .get(getRudraksha);

rudrakshaRouter
  .route("/:id")
  .get(getRudrakshaById)
  .delete(
    // accessController("admin"),
    // This is now the SOFT DELETE route
    deleteRudraksha
  )
  .put(
    // accessController("admin"),
    upload.array("images", 10),
    updateRudraksha
  );

// --- Routes for Draft/Trash Functionality ---

// GET all soft-deleted products (Draft/Trash)

// PUT request to restore a soft-deleted product
rudrakshaRouter.put(
  "/restore/:id",
  // accessController("admin"),
  restoreRudraksha
);

// DELETE request for permanent removal (Hard Delete)
rudrakshaRouter.delete(
  "/hard/:id",
  // accessController("admin"),
  hardDeleteRudraksha
);

module.exports = rudrakshaRouter;

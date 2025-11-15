const Puja = require("../models/Puja");
const Category = require("../models/Category");
const fs = require("fs");
const path = require("path");

// 🕉 Get All Pujas (excluding deleted)
const getAllPujas = async (req, res) => {
  try {
    const pujas = await Puja.find({ isDeleted: false }).populate(
      "category",
      "name description"
    );
    res.json(pujas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🔍 Get Single Puja by ID
const getSinglePujaById = async (req, res) => {
  try {
    const puja = await Puja.findOne({
      _id: req.params.id,
      isDeleted: false,
    }).populate("category", "name description");

    if (!puja) return res.status(404).json({ message: "Puja not found" });
    res.json(puja);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🕉 Get Pujas by Category
const getPujaByCategories = async (req, res) => {
  try {
    const pujas = await Puja.find({
      category: req.params.categoryId,
      isDeleted: false,
    }).populate("category", "name description");

    res.json(pujas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🌅 Get Upcoming Pujas (example category)
const getUpcomingPuja = async (req, res) => {
  try {
    const category = await Category.findOne({ name: "Upcoming Pujas" });
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    const pujas = await Puja.find({
      category: category._id,
      isDeleted: false,
    }).populate("category", "name");

    res.json(pujas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🆕 Create New Puja
const createNewPuja = async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      category,
      significance,
      process,
      shortDescription,
      metaTitle,
      metaDescription,
      metaKeywords,
      isFeatured,
    } = req.body;

    const categoryExists = await Category.findById(category);
    if (!categoryExists)
      return res.status(400).json({ message: "Invalid category provided" });

    const benefits =
      typeof req.body.benefits === "string"
        ? JSON.parse(req.body.benefits)
        : req.body.benefits || [];
    const faqs =
      typeof req.body.faqs === "string"
        ? JSON.parse(req.body.faqs)
        : req.body.faqs || [];
    const reviews =
      typeof req.body.reviews === "string"
        ? JSON.parse(req.body.reviews)
        : req.body.reviews || [];

    const metaKeywordsArray =
      typeof metaKeywords === "string"
        ? metaKeywords.split(",").map((k) => k.trim())
        : metaKeywords || [];

    const imagePath = req.file ? `/uploads/pujas/${req.file.filename}` : null;

    const puja = new Puja({
      title,
      shortDescription,
      price,
      description,
      category,
      significance,
      process,
      benefits,
      faqs,
      reviews,
      image: imagePath,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywordsArray,
      isFeatured: isFeatured === "true" || isFeatured === true,
    });

    await puja.save();
    res.status(201).json(puja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// ✏️ Update Puja by ID
const updatePujaById = async (req, res) => {
  try {
    let {
      title,
      price,
      description,
      category,
      significance,
      process,
      benefits,
      faqs,
      reviews,
      shortDescription,
      metaTitle,
      metaDescription,
      metaKeywords,
      isFeatured,
    } = req.body;

    if (typeof benefits === "string") benefits = JSON.parse(benefits);
    if (typeof faqs === "string") faqs = JSON.parse(faqs);
    if (typeof reviews === "string") reviews = JSON.parse(reviews);

    if (category) {
      const categoryExists = await Category.findById(category);
      if (!categoryExists) {
        return res.status(400).json({ message: "Invalid category provided" });
      }
    }

    const metaKeywordsArray =
      typeof metaKeywords === "string"
        ? metaKeywords.split(",").map((k) => k.trim())
        : metaKeywords || [];

    const updateData = {
      title,
      price,
      description,
      category,
      significance,
      process,
      benefits,
      faqs,
      reviews,
      shortDescription,
      metaTitle,
      metaDescription,
      metaKeywords: metaKeywordsArray,
      isFeatured: isFeatured === "true" || isFeatured === true,
    };

    if (req.file) updateData.image = `/uploads/pujas/${req.file.filename}`;

    const puja = await Puja.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    }).populate("category", "name description");

    if (!puja) return res.status(404).json({ message: "Puja not found" });

    res.json(puja);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// 🧨 Soft Delete Puja
const deletePujaById = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);

    if (!puja) return res.status(404).json({ message: "Puja not found" });
    if (puja.isDeleted)
      return res.status(400).json({ message: "Puja already deleted" });

    puja.isDeleted = true;
    puja.deletedAt = new Date();
    await puja.save();

    res.json({ message: "Puja moved to drafts (soft deleted) for 30 days" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🧩 Restore Puja
const restorePuja = async (req, res) => {
  try {
    const puja = await Puja.findById(req.params.id);
    if (!puja) return res.status(404).json({ message: "Puja not found" });
    if (!puja.isDeleted)
      return res.status(400).json({ message: "Puja is not deleted" });

    puja.isDeleted = false;
    puja.deletedAt = null;
    await puja.save();

    res.json({ message: "Puja restored successfully", puja });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🕒 Get All Deleted (Draft) Pujas
const getDeletedPujas = async (req, res) => {
  try {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);

    const oldPujas = await Puja.find({
      isDeleted: true,
      deletedAt: { $lte: cutoff },
    });

    for (const puja of oldPujas) {
      if (puja.image) {
        const imagePath = path.join(process.cwd(), puja.image);
        fs.unlink(imagePath, (err) => {
          if (err) console.error("Error deleting image:", err.message);
        });
      }
      await Puja.findByIdAndDelete(puja._id);
    }

    const deletedPujas = await Puja.find({ isDeleted: true }).populate(
      "category",
      "name description"
    );

    res.json(deletedPujas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 💀 Hard Delete Puja
const hardDeletePujaById = async (req, res) => {
  try {
    const puja = await Puja.findByIdAndDelete(req.params.id);

    if (!puja) {
      return res.status(404).json({ message: "Puja not found" });
    }

    if (puja.image) {
      const imagePath = path.join(process.cwd(), puja.image);
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error("Failed to delete image:", err.message);
        }
      });
    }

    res.json({ message: "Puja and associated image deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// multiple pujas by categories
// 🕉 Get Pujas by Multiple Categories
const getPujaMultipleByCategories = async (req, res) => {
  try {
    let { categories } = req.body;

    // Validate input
    if (!categories || !Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ message: "Categories array is required" });
    }

    // Remove duplicates
    categories = [...new Set(categories)];

    // Validate each category ID
    const validCategories = await Category.find({
      _id: { $in: categories },
    }).select("_id");

    if (validCategories.length === 0) {
      return res.status(404).json({ message: "No valid categories found" });
    }

    const validCategoryIds = validCategories.map((c) => c._id);

    // Fetch pujas belonging to ANY of those categories
    const pujas = await Puja.find({
      category: { $in: validCategoryIds },
      isDeleted: false,
    }).populate("category", "name description");

    res.json({
      success: true,
      total: pujas.length,
      pujas,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  hardDeletePujaById,
  getAllPujas,
  getSinglePujaById,
  createNewPuja,
  updatePujaById,
  deletePujaById,
  restorePuja,
  getDeletedPujas,
  getPujaByCategories,
  getUpcomingPuja,
  getPujaMultipleByCategories,
};

// const Puja = require("../models/Puja");
// const Category = require("../models/Category");
// const fs = require("fs");
// const path = require("path");

// // Get All Pujas (excluding deleted)
// const getAllPujas = async (req, res) => {
//   try {
//     const pujas = await Puja.find({ isDeleted: false }).populate(
//       "category",
//       "name description"
//     );
//     res.json(pujas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Single Puja
// const getSinglePujaById = async (req, res) => {
//   try {
//     const puja = await Puja.findOne({
//       _id: req.params.id,
//       isDeleted: false,
//     }).populate("category", "name description");

//     if (!puja) return res.status(404).json({ message: "Puja not found" });
//     res.json(puja);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Pujas by Category
// const getPujaByCategories = async (req, res) => {
//   try {
//     const pujas = await Puja.find({
//       category: req.params.categoryId,
//       isDeleted: false,
//     }).populate("category", "name description");

//     res.json(pujas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Upcoming Pujas
// const getUpcomingPuja = async (req, res) => {
//   try {
//     const category = await Category.findOne({ name: "Upcoming Pujas" });
//     if (!category)
//       return res.status(404).json({ message: "Category not found" });

//     const pujas = await Puja.find({
//       category: category._id,
//       isDeleted: false,
//     }).populate("category", "name");

//     res.json(pujas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // ✅ Create New Puja (now includes price)
// const createNewPuja = async (req, res) => {
//   try {
//     const { title, price, description, category, significance, process } =
//       req.body;

//     const categoryExists = await Category.findById(category);
//     if (!categoryExists)
//       return res.status(400).json({ message: "Invalid category provided" });

//     const benefits =
//       typeof req.body.benefits === "string"
//         ? JSON.parse(req.body.benefits)
//         : req.body.benefits || [];
//     const faqs =
//       typeof req.body.faqs === "string"
//         ? JSON.parse(req.body.faqs)
//         : req.body.faqs || [];
//     const reviews =
//       typeof req.body.reviews === "string"
//         ? JSON.parse(req.body.reviews)
//         : req.body.reviews || [];

//     const imagePath = req.file ? `/uploads/pujas/${req.file.filename}` : null;

//     const puja = new Puja({
//       title,
//       price,
//       description,
//       // date,
//       category,
//       significance,
//       benefits,
//       process,
//       faqs,
//       reviews,
//       image: imagePath,
//     });

//     await puja.save();
//     res.status(201).json(puja);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // ✅ Update Puja (now includes price)
// const updatePujaById = async (req, res) => {
//   try {
//     let {
//       title,
//       price,
//       description,
//       // date,
//       category,
//       significance,
//       process,
//       benefits,
//       faqs,
//       reviews,
//     } = req.body;

//     if (typeof benefits === "string") benefits = JSON.parse(benefits);
//     if (typeof faqs === "string") faqs = JSON.parse(faqs);
//     if (typeof reviews === "string") reviews = JSON.parse(reviews);

//     if (category) {
//       const categoryExists = await Category.findById(category);
//       if (!categoryExists) {
//         return res.status(400).json({ message: "Invalid category provided" });
//       }
//     }

//     const updateData = {
//       title,
//       price,
//       description,
//       // date,
//       category,
//       significance,
//       process,
//       benefits,
//       faqs,
//       reviews,
//     };

//     if (req.file) updateData.image = `/uploads/pujas/${req.file.filename}`;

//     const puja = await Puja.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//       runValidators: true,
//     }).populate("category", "name description");

//     if (!puja) return res.status(404).json({ message: "Puja not found" });

//     res.json(puja);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // 🧨 Soft Delete Puja
// const deletePujaById = async (req, res) => {
//   try {
//     const puja = await Puja.findById(req.params.id);

//     if (!puja) return res.status(404).json({ message: "Puja not found" });
//     if (puja.isDeleted)
//       return res.status(400).json({ message: "Puja already deleted" });

//     puja.isDeleted = true;
//     puja.deletedAt = new Date();
//     await puja.save();

//     res.json({ message: "Puja moved to drafts (soft deleted) for 30 days" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 🧩 Restore Puja
// const restorePuja = async (req, res) => {
//   try {
//     const puja = await Puja.findById(req.params.id);
//     if (!puja) return res.status(404).json({ message: "Puja not found" });
//     if (!puja.isDeleted)
//       return res.status(400).json({ message: "Puja is not deleted" });

//     puja.isDeleted = false;
//     puja.deletedAt = null;
//     await puja.save();

//     res.json({ message: "Puja restored successfully", puja });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 🕒 Get All Deleted Pujas (Drafts)
// const getDeletedPujas = async (req, res) => {
//   try {
//     const cutoff = new Date();
//     cutoff.setDate(cutoff.getDate() - 30);

//     const oldPujas = await Puja.find({
//       isDeleted: true,
//       deletedAt: { $lte: cutoff },
//     });

//     for (const puja of oldPujas) {
//       if (puja.image) {
//         const imagePath = path.join(process.cwd(), puja.image);
//         fs.unlink(imagePath, (err) => {
//           if (err) console.error("Error deleting image:", err.message);
//         });
//       }
//       await Puja.findByIdAndDelete(puja._id);
//     }

//     const deletedPujas = await Puja.find({ isDeleted: true }).populate(
//       "category",
//       "name description"
//     );

//     res.json(deletedPujas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 💀 Hard Delete Puja
// const hardDeletePujaById = async (req, res) => {
//   try {
//     const puja = await Puja.findByIdAndDelete(req.params.id);

//     if (!puja) {
//       return res.status(404).json({ message: "Puja not found" });
//     }

//     if (puja.image) {
//       const imagePath = path.join(process.cwd(), puja.image);
//       fs.unlink(imagePath, (err) => {
//         if (err) {
//           console.error("Failed to delete image:", err.message);
//         }
//       });
//     }

//     res.json({ message: "Puja and associated image deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   hardDeletePujaById,
//   getAllPujas,
//   getSinglePujaById,
//   createNewPuja,
//   updatePujaById,
//   deletePujaById,
//   restorePuja,
//   getDeletedPujas,
//   getPujaByCategories,
//   getUpcomingPuja,
// };

// const Puja = require("../models/Puja");
// const Category = require("../models/Category");
// const fs = require("fs");
// const path = require("path");

// // Get All Pujas (excluding deleted)
// const getAllPujas = async (req, res) => {
//   try {
//     const pujas = await Puja.find({ isDeleted: false }).populate(
//       "category",
//       "name description"
//     );
//     res.json(pujas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Single Puja
// const getSinglePujaById = async (req, res) => {
//   try {
//     const puja = await Puja.findOne({
//       _id: req.params.id,
//       isDeleted: false,
//     }).populate("category", "name description");
//     if (!puja) return res.status(404).json({ message: "Puja not found" });
//     res.json(puja);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Pujas by Category
// const getPujaByCategories = async (req, res) => {
//   try {
//     const pujas = await Puja.find({
//       category: req.params.categoryId,
//       isDeleted: false,
//     }).populate("category", "name description");
//     res.json(pujas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get Upcoming Pujas
// const getUpcomingPuja = async (req, res) => {
//   try {
//     const category = await Category.findOne({ name: "Upcoming Pujas" });
//     if (!category)
//       return res.status(404).json({ message: "Category not found" });

//     const pujas = await Puja.find({
//       category: category._id,
//       isDeleted: false,
//     }).populate("category", "name");

//     res.json(pujas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create New Puja
// const createNewPuja = async (req, res) => {
//   try {
//     const { title, description, date, category, significance, process } =
//       req.body;

//     const categoryExists = await Category.findById(category);
//     if (!categoryExists)
//       return res.status(400).json({ message: "Invalid category provided" });

//     const benefits =
//       typeof req.body.benefits === "string"
//         ? JSON.parse(req.body.benefits)
//         : req.body.benefits || [];
//     const faqs =
//       typeof req.body.faqs === "string"
//         ? JSON.parse(req.body.faqs)
//         : req.body.faqs || [];
//     const reviews =
//       typeof req.body.reviews === "string"
//         ? JSON.parse(req.body.reviews)
//         : req.body.reviews || [];

//     const imagePath = req.file ? `/uploads/pujas/${req.file.filename}` : null;

//     const puja = new Puja({
//       title,
//       description,
//       date,
//       category,
//       significance,
//       benefits,
//       process,
//       faqs,
//       reviews,
//       image: imagePath,
//     });

//     await puja.save();
//     res.status(201).json(puja);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update Puja
// const updatePujaById = async (req, res) => {
//   try {
//     let {
//       title,
//       description,
//       date,
//       category,
//       significance,
//       process,
//       benefits,
//       faqs,
//       reviews,
//     } = req.body;

//     if (typeof benefits === "string") benefits = JSON.parse(benefits);
//     if (typeof faqs === "string") faqs = JSON.parse(faqs);
//     if (typeof reviews === "string") reviews = JSON.parse(reviews);

//     if (category) {
//       const categoryExists = await Category.findById(category);
//       if (!categoryExists) {
//         return res.status(400).json({ message: "Invalid category provided" });
//       }
//     }

//     const updateData = {
//       title,
//       description,
//       date,
//       category,
//       significance,
//       process,
//       benefits,
//       faqs,
//       reviews,
//     };

//     if (req.file) updateData.image = `/uploads/pujas/${req.file.filename}`;

//     const puja = await Puja.findByIdAndUpdate(req.params.id, updateData, {
//       new: true,
//       runValidators: true,
//     }).populate("category", "name description");

//     if (!puja) return res.status(404).json({ message: "Puja not found" });

//     res.json(puja);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // 🧨 Soft Delete Puja
// const deletePujaById = async (req, res) => {
//   try {
//     const puja = await Puja.findById(req.params.id);

//     if (!puja) return res.status(404).json({ message: "Puja not found" });
//     if (puja.isDeleted)
//       return res.status(400).json({ message: "Puja already deleted" });

//     puja.isDeleted = true;
//     puja.deletedAt = new Date();
//     await puja.save();

//     res.json({ message: "Puja moved to drafts (soft deleted) for 30 days" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 🧩 Restore Puja (Undo Delete)
// const restorePuja = async (req, res) => {
//   try {
//     const puja = await Puja.findById(req.params.id);
//     if (!puja) return res.status(404).json({ message: "Puja not found" });
//     if (!puja.isDeleted)
//       return res.status(400).json({ message: "Puja is not deleted" });

//     puja.isDeleted = false;
//     puja.deletedAt = null;
//     await puja.save();

//     res.json({ message: "Puja restored successfully", puja });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 🕒 Get All Deleted Pujas (Drafts)
// const getDeletedPujas = async (req, res) => {
//   try {
//     // Auto delete old pujas (older than 30 days)
//     const cutoff = new Date();
//     cutoff.setDate(cutoff.getDate() - 30);

//     const oldPujas = await Puja.find({
//       isDeleted: true,
//       deletedAt: { $lte: cutoff },
//     });

//     for (const puja of oldPujas) {
//       if (puja.image) {
//         const imagePath = path.join(process.cwd(), puja.image);
//         fs.unlink(imagePath, (err) => {
//           if (err) console.error("Error deleting image:", err.message);
//         });
//       }
//       await Puja.findByIdAndDelete(puja._id);
//     }

//     const deletedPujas = await Puja.find({ isDeleted: true }).populate(
//       "category",
//       "name description"
//     );

//     res.json(deletedPujas);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // 💀 Hard Delete Puja (Permanent Deletion)
// // Delete Puja by ID
// const hardDeletePujaById = async (req, res) => {
//   try {
//     const puja = await Puja.findByIdAndDelete(req.params.id);

//     if (!puja) {
//       return res.status(404).json({ message: "Puja not found" });
//     }

//     // If puja has an image, delete it from folder
//     if (puja.image) {
//       const imagePath = path.join(process.cwd(), puja.image);
//       fs.unlink(imagePath, (err) => {
//         if (err) {
//           console.error("Failed to delete image:", err.message);
//         }
//       });
//     }

//     res.json({ message: "Puja and associated image deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// module.exports = {
//   hardDeletePujaById,
//   getAllPujas,
//   getSinglePujaById,
//   createNewPuja,
//   updatePujaById,
//   deletePujaById,
//   restorePuja,
//   getDeletedPujas,
//   getPujaByCategories,
//   getUpcomingPuja,
// };

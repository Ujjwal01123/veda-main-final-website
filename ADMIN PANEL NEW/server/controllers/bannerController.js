const Banner = require("../models/Banner");
const path = require("path");
const fs = require("fs");

// 📤 Add or Update Banner (Up to 6 images)
exports.addOrUpdateBanner = async (req, res) => {
  try {
    const { sectionName } = req.body;

    if (!sectionName) {
      return res.status(400).json({ message: "Section name is required" });
    }

    // ✅ Require at least 1 and up to 6 files
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "At least 1 image is required" });
    }
    if (req.files.length > 6) {
      return res
        .status(400)
        .json({ message: "You can upload a maximum of 6 images per banner" });
    }

    // Handle altText array or single values
    const altTexts = req.body.altText
      ? Array.isArray(req.body.altText)
        ? req.body.altText
        : [req.body.altText]
      : [];

    const images = req.files.map((file, index) => ({
      imageUrl: `/uploads/banners/${file.filename}`,
      altText: altTexts[index] || "",
    }));

    // Find existing banner for the section
    let banner = await Banner.findOne({ sectionName });

    if (banner) {
      // 🗑️ Delete old images before replacing
      banner.images.forEach((img) => {
        const oldImagePath = path.join(process.cwd(), img.imageUrl);
        fs.unlink(oldImagePath, (err) => {
          if (err)
            console.error("Error deleting old banner image:", err.message);
        });
      });

      // Replace with new images
      banner.images = images;
      await banner.save();
    } else {
      banner = new Banner({ sectionName, images });
      await banner.save();
    }

    res.status(200).json({
      success: true,
      message: "Banner added/updated successfully",
      data: banner,
    });
  } catch (error) {
    console.error("Error adding/updating banner:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📥 Get All Banners
exports.getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: banners });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 📄 Get Banner by Section
exports.getBannerBySection = async (req, res) => {
  try {
    const { sectionName } = req.params;
    const banner = await Banner.findOne({ sectionName });
    if (!banner) return res.status(404).json({ message: "Banner not found" });
    res.status(200).json({ success: true, data: banner });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// ❌ Delete Banner
exports.deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) return res.status(404).json({ message: "Banner not found" });

    // Delete all images
    banner.images.forEach((img) => {
      const filePath = path.join(process.cwd(), img.imageUrl);
      fs.unlink(filePath, (err) => {
        if (err) console.error("Error deleting banner image:", err.message);
      });
    });

    await Banner.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// const Banner = require("../models/Banner");
// const path = require("path");
// const fs = require("fs");

// // 📤 Add or Update Banner (Exactly 3 images)
// exports.addOrUpdateBanner = async (req, res) => {
//   try {
//     const { sectionName } = req.body;

//     if (!sectionName) {
//       return res.status(400).json({ message: "Section name is required" });
//     }

//     // ✅ Require exactly 3 files
//     if (!req.files || req.files.length !== 6) {
//       return res
//         .status(400)
//         .json({ message: "Exactly 6 images are required for each banner" });
//     }

//     // Handle altText array or single values
//     const altTexts = req.body.altText
//       ? Array.isArray(req.body.altText)
//         ? req.body.altText
//         : [req.body.altText]
//       : [];

//     const images = req.files.map((file, index) => ({
//       imageUrl: `/uploads/banners/${file.filename}`,
//       altText: altTexts[index] || "",
//     }));

//     // Find existing banner for the section
//     let banner = await Banner.findOne({ sectionName });

//     if (banner) {
//       // 🗑️ Delete old images
//       banner.images.forEach((img) => {
//         const oldImagePath = path.join(process.cwd(), img.imageUrl);
//         fs.unlink(oldImagePath, (err) => {
//           if (err)
//             console.error("Error deleting old banner image:", err.message);
//         });
//       });

//       // Replace with new images
//       banner.images = images;
//       await banner.save();
//     } else {
//       banner = new Banner({ sectionName, images });
//       await banner.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: "Banner added/updated successfully",
//       data: banner,
//     });
//   } catch (error) {
//     console.error("Error adding/updating banner:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 📥 Get All Banners
// exports.getAllBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: banners });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 📄 Get Banner by Section
// exports.getBannerBySection = async (req, res) => {
//   try {
//     const { sectionName } = req.params;
//     const banner = await Banner.findOne({ sectionName });
//     if (!banner) return res.status(404).json({ message: "Banner not found" });
//     res.status(200).json({ success: true, data: banner });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ❌ Delete Banner
// exports.deleteBanner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const banner = await Banner.findById(id);
//     if (!banner) return res.status(404).json({ message: "Banner not found" });

//     // Delete all images
//     banner.images.forEach((img) => {
//       const filePath = path.join(process.cwd(), img.imageUrl);
//       fs.unlink(filePath, (err) => {
//         if (err) console.error("Error deleting banner image:", err.message);
//       });
//     });

//     await Banner.findByIdAndDelete(id);
//     res
//       .status(200)
//       .json({ success: true, message: "Banner deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// const Banner = require("../models/Banner");
// const path = require("path");
// const fs = require("fs");

// // 📤 Add or Update Banner (One per section)
// exports.addOrUpdateBanner = async (req, res) => {
//   try {
//     const { sectionName, altText } = req.body;

//     if (!sectionName || !req.file) {
//       return res
//         .status(400)
//         .json({ message: "Section name and image are required" });
//     }

//     const imageUrl = `/uploads/banners/${req.file.filename}`;

//     // Check if banner already exists for this section
//     let banner = await Banner.findOne({ sectionName });

//     if (banner) {
//       // Delete old image if exists
//       if (banner.imageUrl) {
//         const oldImagePath = path.join(process.cwd(), banner.imageUrl);
//         fs.unlink(oldImagePath, (err) => {
//           if (err)
//             console.error("Error deleting old banner image:", err.message);
//         });
//       }

//       banner.imageUrl = imageUrl;
//       banner.altText = altText || "";
//       await banner.save();
//     } else {
//       banner = new Banner({ sectionName, imageUrl, altText });
//       await banner.save();
//     }

//     res.status(200).json({
//       success: true,
//       message: "Banner added/updated successfully",
//       data: banner,
//     });
//   } catch (error) {
//     console.error("Error adding/updating banner:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 📥 Get All Banners
// exports.getAllBanners = async (req, res) => {
//   try {
//     const banners = await Banner.find().sort({ createdAt: -1 });
//     res.status(200).json({ success: true, data: banners });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // 📄 Get Banner by Section
// exports.getBannerBySection = async (req, res) => {
//   try {
//     const { sectionName } = req.params;
//     const banner = await Banner.findOne({ sectionName });
//     if (!banner) return res.status(404).json({ message: "Banner not found" });
//     res.status(200).json({ success: true, data: banner });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // ❌ Delete Banner
// exports.deleteBanner = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const banner = await Banner.findById(id);
//     if (!banner) return res.status(404).json({ message: "Banner not found" });

//     // Delete associated image file
//     if (banner.imageUrl) {
//       const filePath = path.join(process.cwd(), banner.imageUrl);
//       fs.unlink(filePath, (err) => {
//         if (err) console.error("Error deleting banner image:", err.message);
//       });
//     }

//     await Banner.findByIdAndDelete(id);
//     res
//       .status(200)
//       .json({ success: true, message: "Banner deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

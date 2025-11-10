const fs = require("node:fs");
const Rudraksha = require("../models/rudraksha.model.js");
const ApiResponse = require("../utils/apiResponse.js");

// -------------------- ADD RUDRAKSHA --------------------
exports.addRudraksha = async (req, res) => {
  const { body } = req;
  const energization = body?.energization ? JSON.parse(body?.energization) : [];
  const options = JSON.parse(req.body.options);

  const imagesPath = req.files
    ? req.files.map((file) => file.path.replace(/\\/g, "/"))
    : [];
  const images = req.files
    ? req.files.map(
        (file) =>
          `${req.protocol}://${req.get("host")}/${file.path.replace(
            /\\/g,
            "/"
          )}`
      )
    : [];

  const product = await Rudraksha.create({
    ...body,
    energization,
    options,
    productImage: images,
    productPath: imagesPath,
    shopifyLink: body.shopifyLink || "",
    youtubeLink: body.youtubeLink || "",
    isDeleted: false,
    deletedAt: null,
  });

  console.log(product);
  return ApiResponse.created(product, "Rudraksha added successfully").send(res);
};

// -------------------- GET ALL ACTIVE RUDRAKSHA --------------------
exports.getRudraksha = async (req, res) => {
  // Only fetch products that are NOT deleted
  const rudraksha = await Rudraksha.find({ isDeleted: false });
  return ApiResponse.success({ rudraksha }).send(res);
};

// -------------------- GET DRAFT RUDRAKSHA (TRASH) --------------------
exports.getDraftRudraksha = async (req, res) => {
  // Only fetch products that ARE deleted (in the trash/draft)
  const rudraksha = await Rudraksha.find({ isDeleted: true });
  return ApiResponse.success(
    { rudraksha },
    "Draft rudraksha fetched successfully"
  ).send(res);
};

// -------------------- GET RUDRAKSHA BY ID --------------------
exports.getRudrakshaById = async (req, res) => {
  const { id } = req.params;
  // Only find active products by ID
  const rudraksha = await Rudraksha.findOne({ _id: id, isDeleted: false });
  if (!rudraksha) {
    return ApiResponse.notFound({}, "Active Rudraksha product not found").send(
      res
    );
  }
  return ApiResponse.success({ rudraksha }).send(res);
};

// -------------------- SOFT DELETE RUDRAKSHA (TO DRAFT) --------------------
exports.deleteRudraksha = async (req, res) => {
  const { id } = req.params;

  // Soft delete: set isDeleted to true and deletedAt to now (triggers TTL)
  const rudraksha = await Rudraksha.findByIdAndUpdate(
    id,
    { isDeleted: true, deletedAt: new Date() },
    { new: true }
  );

  if (!rudraksha) {
    return ApiResponse.notFound({}, "Rudraksha product not found").send(res);
  }

  return ApiResponse.success(
    {},
    "Rudraksha product moved to draft (scheduled for permanent deletion in 30 days)"
  ).send(res);
};

// -------------------- RESTORE RUDRAKSHA FROM DRAFT --------------------
exports.restoreRudraksha = async (req, res) => {
  const { id } = req.params;

  // Restore: set isDeleted to false and deletedAt to null
  const rudraksha = await Rudraksha.findByIdAndUpdate(
    id,
    { isDeleted: false, deletedAt: null },
    { new: true }
  );

  if (!rudraksha) {
    return ApiResponse.notFound({}, "Draft Rudraksha product not found").send(
      res
    );
  }

  return ApiResponse.success(
    {},
    "Rudraksha product restored successfully"
  ).send(res);
};

// -------------------- HARD DELETE RUDRAKSHA (PERMANENT) --------------------
exports.hardDeleteRudraksha = async (req, res) => {
  const { id } = req.params;

  const rudraksha = await Rudraksha.findById(id);
  if (rudraksha) {
    // 1. Delete associated files from the filesystem
    rudraksha.productPath.forEach((path) => {
      fs.unlink(path, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });
    });
  }

  // 2. Permanently delete the document from the database
  await Rudraksha.findByIdAndDelete(id);

  return ApiResponse.success({}, "Rudraksha product permanently deleted").send(
    res
  );
};

// -------------------- UPDATE RUDRAKSHA --------------------
exports.updateRudraksha = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      stock,
      productName,
      productPrice,
      productDiscount,
      productAbout,
      productFeatures,
      productBenefits,
      productFaqs,
      productShipping,
      energization,
      options,
      existingImages,
      removedImages,
      shopifyLink, // <-- add this
      youtubeLink, // <-- add this
    } = req.body;

    // Helper function to safely parse JSON arrays
    const safeParse = (data) => {
      try {
        if (!data) return [];
        return Array.isArray(data) ? data : JSON.parse(data);
      } catch (e) {
        console.warn("Invalid JSON data:", data);
        return [];
      }
    };

    let keepImages = safeParse(existingImages);
    let removedImgs = safeParse(removedImages);

    const imagesPath = req.files
      ? req.files.map((f) => f.path.replace(/\\/g, "/"))
      : [];
    const images = req.files
      ? req.files.map(
          (f) =>
            `${req.protocol}://${req.get("host")}/${f.path.replace(/\\/g, "/")}`
        )
      : [];

    const product = await Rudraksha.findById(id);
    if (!product) {
      return ApiResponse.notFound({}, "Product not found").send(res);
    }

    // --- Update scalar fields ---
    if (stock !== undefined) product.stock = stock;
    if (productName !== undefined) product.productName = productName;
    if (productPrice !== undefined) product.productPrice = productPrice;
    if (productDiscount !== undefined)
      product.productDiscount = productDiscount;
    if (productAbout !== undefined)
      product.productAbout = safeParse(productAbout);
    if (productFeatures !== undefined)
      product.productFeatures = safeParse(productFeatures);
    if (productBenefits !== undefined)
      product.productBenefits = safeParse(productBenefits);
    if (productFaqs !== undefined) product.productFaqs = safeParse(productFaqs);
    if (productShipping !== undefined)
      product.productShipping = safeParse(productShipping);
    // --- Update links ---
    if (req.body.shopifyLink !== undefined)
      product.shopifyLink = req.body.shopifyLink;
    if (req.body.youtubeLink !== undefined)
      product.youtubeLink = req.body.youtubeLink;

    // --- Image Management Logic ---
    // Identify image URLs and paths to delete
    const toDeleteUrls = product.productImage.filter(
      (img) => !keepImages.includes(img) || removedImgs.includes(img)
    );

    toDeleteUrls.forEach((url) => {
      const idx = product.productImage.indexOf(url);
      if (idx !== -1) {
        const filePath = product.productPath[idx];
        if (filePath) {
          fs.unlink(filePath, (err) => {
            if (err) console.error("Error deleting file:", err);
          });
        }
      }
    });

    // Filter down to only kept images/paths
    const keptImages = [];
    const keptImagePaths = [];
    product.productImage.forEach((img, idx) => {
      if (keepImages.includes(img) && !removedImgs.includes(img)) {
        keptImages.push(img);
        keptImagePaths.push(product.productPath[idx]);
      }
    });

    // Update product image arrays with kept existing images and new uploaded images
    product.productImage = [...keptImages, ...images];
    product.productPath = [...keptImagePaths, ...imagesPath];
    // --- End Image Management Logic ---

    // --- JSON fields update ---
    if (energization) {
      try {
        product.energization = JSON.parse(energization);
      } catch (e) {
        console.warn("Invalid energization JSON:", energization);
      }
    }

    if (options) {
      try {
        product.options = JSON.parse(options);
      } catch (e) {
        console.warn("Invalid options JSON:", options);
      }
    }

    await product.save();
    return ApiResponse.success(
      product,
      "Rudraksha product updated successfully"
    ).send(res);
  } catch (error) {
    console.error("Update Rudraksha Error:", error);
    return ApiResponse.internalServerError(
      {},
      "Something went wrong while updating"
    ).send(res);
  }
};

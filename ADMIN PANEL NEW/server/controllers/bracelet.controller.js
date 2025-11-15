const fs = require("fs");
const Bracelet = require("../models/bracelet.model.js");
const ApiResponse = require("../utils/apiResponse.js");
const asyncHandler = require("../utils/asyncHandler.js");

// -------------------- ADD BRACELET --------------------
exports.addBracelet = asyncHandler(async (req, res) => {
  const { body } = req;

  const { shortDescription, metaTitle, metaDescription, metaKeywords } = body;

  const energization = body?.energization ? JSON.parse(body.energization) : [];
  const sizes = body?.sizes ? JSON.parse(body.sizes) : [];
  const certificates = body?.certificates ? JSON.parse(body.certificates) : [];
  const imagesPath = req?.files
    ? req.files.map((f) => f.path.replace(/\\/g, "/"))
    : [];
  const images = req?.files
    ? req.files.map(
        (f) =>
          `${req.protocol}://${req.get("host")}/${f.path.replace(/\\/g, "/")}`
      )
    : [];

  const product = new Bracelet({
    shortDescription,
    metaTitle,
    metaDescription,
    metaKeywords,
    ...body,
    energization,
    sizes,
    certificates,
    productImage: images,
    productPath: imagesPath,

    shopifyLink: body.shopifyLink || "",
    youtubeLink: body.youtubeLink || "",
  });

  await product.save();
  return ApiResponse.created(product, "Bracelet added successfully").send(res);
});

// -------------------- GET ALL BRACELETS --------------------
exports.getBracelet = asyncHandler(async (req, res) => {
  const bracelets = await Bracelet.find({ isDeleted: false });
  return ApiResponse.success({ bracelets }).send(res);
});

// -------------------- GET BRACELET BY ID --------------------
exports.getBraceletById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bracelet = await Bracelet.findById(id);
  if (!bracelet || bracelet.isDeleted) {
    return ApiResponse.notFound({}, "Bracelet not found").send(res);
  }
  return ApiResponse.success({ bracelet }).send(res);
});

// -------------------- SOFT DELETE BRACELET --------------------
exports.softDeleteBracelet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bracelet = await Bracelet.findById(id);
  if (!bracelet || bracelet.isDeleted) {
    return ApiResponse.notFound({}, "Bracelet not found").send(res);
  }

  bracelet.isDeleted = true;
  bracelet.deletedAt = new Date();
  await bracelet.save();

  return ApiResponse.success(
    {},
    "Bracelet moved to drafts (soft deleted)"
  ).send(res);
});

// -------------------- HARD DELETE BRACELET --------------------
exports.hardDeleteBracelet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bracelet = await Bracelet.findById(id);
  if (!bracelet) {
    return ApiResponse.notFound({}, "Bracelet not found").send(res);
  }

  // Delete associated files
  bracelet.productPath.forEach((path) => {
    fs.unlink(path, (err) => {
      if (err) console.error("Error deleting file:", err);
    });
  });

  await Bracelet.findByIdAndDelete(id);

  return ApiResponse.success({}, "Bracelet permanently deleted").send(res);
});

// -------------------- GET ALL DRAFTS --------------------
exports.getDrafts = asyncHandler(async (req, res) => {
  const drafts = await Bracelet.find({ isDeleted: true });
  return ApiResponse.success({ drafts }).send(res);
});

// -------------------- UPDATE BRACELET --------------------
exports.updateBracelet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Bracelet.findById(id);
  if (!product || product.isDeleted) {
    return ApiResponse.notFound({}, "Bracelet not found").send(res);
  }

  const {
    stock,
    productName,
    productPrice,
    productDiscount,
    productAbout,
    productFeatures,
    productBenefits,
    productFaqs,
    shortDescription,
    metaTitle,
    metaDescription,
    metaKeywords,
    productShipping,
    energization,
    sizes,
    certificates,
    existingImages,
    shopifyLink, // <-- added
    youtubeLink, // <-- added
  } = req.body;

  // Update new fields
  if (shopifyLink !== undefined) product.shopifyLink = shopifyLink;
  if (youtubeLink !== undefined) product.youtubeLink = youtubeLink;

  // Handle existing images
  let keepImages = [];
  try {
    if (existingImages)
      keepImages = Array.isArray(existingImages)
        ? existingImages
        : JSON.parse(existingImages);
  } catch {
    console.warn("Invalid existingImages JSON");
  }

  const imagesPath = req.files
    ? req.files.map((f) => f.path.replace(/\\/g, "/"))
    : [];
  const images = req.files
    ? req.files.map(
        (f) =>
          `${req.protocol}://${req.get("host")}/${f.path.replace(/\\/g, "/")}`
      )
    : [];

  // Delete removed images
  if (keepImages.length > 0) {
    const toDelete = product.productImage.filter(
      (img) => !keepImages.includes(img)
    );
    toDelete.forEach((url) => {
      const idx = product.productImage.indexOf(url);
      if (idx !== -1) {
        const filePath = product.productPath[idx];
        if (filePath) fs.unlink(filePath, (err) => err && console.error(err));
      }
    });

    const keptPaths = product.productImage
      .map((img, idx) =>
        keepImages.includes(img) ? product.productPath[idx] : null
      )
      .filter(Boolean);
    product.productImage = keepImages;
    product.productPath = keptPaths;
  } else {
    product.productImage = [];
    product.productPath = [];
  }

  // Add new images
  if (images.length > 0) {
    product.productImage.push(...images);
    product.productPath.push(...imagesPath);
  }

  // Update fields
  if (stock !== undefined) product.stock = stock;
  if (productName) product.productName = productName;
  if (productPrice !== undefined) product.productPrice = productPrice;
  if (productDiscount !== undefined) product.productDiscount = productDiscount;

  if (productAbout !== undefined)
    product.productAbout = Array.isArray(productAbout)
      ? productAbout
      : [productAbout];
  if (productFeatures !== undefined)
    product.productFeatures = Array.isArray(productFeatures)
      ? productFeatures
      : [productFeatures];
  if (productBenefits !== undefined)
    product.productBenefits = Array.isArray(productBenefits)
      ? productBenefits
      : [productBenefits];
  if (productFaqs !== undefined)
    product.productFaqs = Array.isArray(productFaqs)
      ? productFaqs
      : [productFaqs];
  if (productShipping !== undefined)
    product.productShipping = Array.isArray(productShipping)
      ? productShipping
      : [productShipping];

  if (energization) product.energization = JSON.parse(energization || "[]");
  if (sizes) product.sizes = JSON.parse(sizes || "[]");
  if (certificates) product.certificates = JSON.parse(certificates || "[]");

  await product.save();
  return ApiResponse.success(product, "Bracelet updated successfully").send(
    res
  );
});

// -------------------- RESTORE BRACELET --------------------
exports.restoreBracelet = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const bracelet = await Bracelet.findById(id);

  if (!bracelet || !bracelet.isDeleted) {
    return ApiResponse.notFound({}, "Bracelet not found or not in drafts").send(
      res
    );
  }

  bracelet.isDeleted = false;
  bracelet.deletedAt = null; // remove deleted date
  await bracelet.save();

  return ApiResponse.success({}, "Bracelet restored successfully").send(res);
});

const Blog = require("../models/Blogs");
const path = require("path");
const fs = require("fs");

// 🟢 Create Blog
exports.createBlog = async (req, res) => {
  try {
    const { title, content, authorType } = req.body;
    let imagePath;

    if (req.file) {
      imagePath = `/uploads/blogs/${req.file.filename}`;
    }

    const blog = await Blog.create({
      title,
      content,
      image: imagePath,
      authorType,
    });

    res.status(201).json({ success: true, data: { blog } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 Get All Blogs (excluding deleted)
exports.getAllBlogs = async (req, res) => {
  try {
    const filter = { isDeleted: false };
    if (req.query.authorType) filter.authorType = req.query.authorType;

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: { blogs } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 Get Single Blog
exports.getBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res
        .status(400)
        .json({ success: false, message: "Invalid Blog ID" });

    const blog = await Blog.findById(id);
    if (!blog || blog.isDeleted)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    res.json({ success: true, data: { blog } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 Update Blog
exports.updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res
        .status(400)
        .json({ success: false, message: "Invalid Blog ID" });

    const blog = await Blog.findById(id);
    if (!blog || blog.isDeleted)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    const { title, content, authorType } = req.body;

    if (title) blog.title = title;
    if (content) blog.content = content;
    if (authorType) blog.authorType = authorType;

    if (req.file) {
      if (blog.image) {
        const oldPath = path.join(__dirname, "../public", blog.image);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      blog.image = `/uploads/blogs/${req.file.filename}`;
    }

    await blog.save();
    res.json({ success: true, data: { blog } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 Soft Delete Blog (moves to draft/trash)
exports.softDeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res
        .status(400)
        .json({ success: false, message: "Invalid Blog ID" });

    const blog = await Blog.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    if (blog.isDeleted)
      return res
        .status(400)
        .json({ success: false, message: "Blog already in trash" });

    blog.isDeleted = true;
    blog.deletedAt = new Date();
    await blog.save();

    res.json({
      success: true,
      message: "Blog moved to trash (will auto-delete after 30 days).",
      data: { blog },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 Permanently Delete Blog (manually, before 30 days)
exports.hardDeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res
        .status(400)
        .json({ success: false, message: "Invalid Blog ID" });

    const blog = await Blog.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    if (blog.image) {
      const oldPath = path.join(__dirname, "../public", blog.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }

    await Blog.findByIdAndDelete(id);
    res.json({ success: true, message: "Blog permanently deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 Get Deleted Blogs (Trash)
exports.getDeletedBlogs = async (req, res) => {
  try {
    const deletedBlogs = await Blog.find({ isDeleted: true }).sort({
      deletedAt: -1,
    });
    res.json({ success: true, data: { deletedBlogs } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// 🟢 Restore Soft Deleted Blog
exports.restoreBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/))
      return res
        .status(400)
        .json({ success: false, message: "Invalid Blog ID" });

    const blog = await Blog.findById(id);
    if (!blog)
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });

    if (!blog.isDeleted)
      return res
        .status(400)
        .json({ success: false, message: "Blog is not in trash" });

    blog.isDeleted = false;
    blog.deletedAt = null;
    await blog.save();

    res.json({
      success: true,
      message: "Blog restored successfully",
      data: { blog },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

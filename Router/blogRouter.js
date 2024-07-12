const express = require("express");
const router = express.Router();
const { createBlogPost, getAllBlogs, updateBlog, deleteBlog } = require("../Controller/BlogController");
const { protect } = require("../AuthMiddleware/Protect");

router.post("/", protect, createBlogPost);
router.get("/", protect, getAllBlogs);
router.put("/", protect, updateBlog);
router.delete("/", protect, deleteBlog);

module.exports = router;
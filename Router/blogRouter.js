const express = require("express");
const router = express.Router();
const { createBlogPost, getAllBlogs, updateBlog, deleteBlog } = require("../Controller/BlogController");
const { protect } = require("../AuthMiddleware/Protect");

router.post("/add", protect, createBlogPost);
router.get("/", protect, getAllBlogs);
router.put("/update", protect, updateBlog);
router.delete("/delete", protect, deleteBlog);

module.exports = router;
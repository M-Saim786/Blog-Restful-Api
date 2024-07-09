const express = require("express");
const router = express.Router();
const { createBlogPost, getAllBlogs, updateBlog } = require("../Controller/BlogController");
const { protect } = require("../AuthMiddleware/Protect");

router.post("/create", protect, createBlogPost);
router.get("/", protect, getAllBlogs);
router.put("/update/:id", protect, updateBlog);
// router.get("/delete", protect, getAllBlogs);

module.exports = router;
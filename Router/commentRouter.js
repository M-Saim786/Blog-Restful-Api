const express = require("express");
const router = express.Router();
// const { createBlogPost, getAllBlogs, updateBlog } = require("../Controller/BlogController");
const { protect } = require("../AuthMiddleware/Protect");
const { addComment, updateComment, deleteComment } = require("../Controller/CommentController");

router.post("/add", protect, addComment);
// router.get("/comment", protect, getAllBlogs);
router.put("/update", protect, updateComment);
router.delete("/delete", protect, deleteComment);

module.exports = router;
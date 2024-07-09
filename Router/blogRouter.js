const express = require("express");
const router = express.Router();
const { createBlogPost } = require("../Controller/BlogController");
const { protect } = require("../AuthMiddleware/Protect");

router.post("/create", protect, createBlogPost);

module.exports = router;
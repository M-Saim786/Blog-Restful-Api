const express = require("express");
const router = express.Router();
const { createBlogPost, getAllBlogs, updateBlog, deleteBlog } = require("../Controller/BlogController");
const { protect } = require("../AuthMiddleware/Protect");

const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/")
    },
    filename: function (req, file, cb) {
        const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9);
        console.log("uniqueName:", uniqueName)
        const finalName = file.originalname.split(".").pop();
        cb(null, "media- " + uniqueName + "." + finalName);
    }
})

const upload = multer({ storage: storage })

router.post("/add", protect, upload.single("blogImg"), createBlogPost);
router.get("/", protect, getAllBlogs);
router.put("/update", protect, upload.single("blogImg"), updateBlog);
router.delete("/delete", protect, deleteBlog);

module.exports = router;
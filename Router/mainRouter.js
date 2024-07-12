const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter.js")
const blogRouter = require("./blogRouter.js")
const commentRouter = require("./commentRouter.js")

router.use("/user", userRouter)
router.use("/blog", blogRouter)
router.use("/comment", commentRouter)

module.exports = router;
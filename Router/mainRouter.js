const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter.js")
const blogRouter = require("./blogRouter.js")

router.use("/user", userRouter)
router.use("/blog", blogRouter)

module.exports = router;
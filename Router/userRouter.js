const express = require("express");
const router = express.Router();
const { signUp, login } = require("../Controller/UserController");

router.post("/signUp", signUp);
router.post("/login", login);

module.exports = router;
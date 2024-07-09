const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const userSchema = require("../Model/userSchema");
require("dotenv").config();



const protect = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Not authorized, no token' });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'Not authorized, token missing' });
        }

        const verifyToken = await jwt.verify(token, process.env.secretKey)
        const user = await userSchema.findById({ _id: verifyToken?.userId })
        if (!user) {
            res.status(404).json({
                message: "User not found"
            })
        }

        req.user = user;
        next();

    } catch (err) {
        res.status(401).json({ message: err.message });
    }
})

module.exports = { protect }
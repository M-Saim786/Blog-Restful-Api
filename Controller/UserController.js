const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken")
require("dotenv").config()
const secretKey = process.env.secretKey

const userSchema = require("../Model/userSchema");
const userValidate = require("../Validator/userValidator");

exports.signUp = async (req, res) => {
    try {
        const { email, password, userName } = req.body;
        if (!email || !password || !userName)
            return res.status(400).json({
                message: "email , password or username not found"
            })
        await userValidate.validateAsync({ email, password, userName })
        const checkUser = await userSchema.findOne({ email });
        if (checkUser) {
            return res.status(400).json({
                message: "User already exists"
            })
        }
        req.body.password = await bcryptjs.hash(password, 12)
        const user = await userSchema(req.body).save();
        return res.status(200).json({
            message: "User created successfully",
            data: user
        })
    } catch (err) {
        return res.status(500).json({
            err: err.message
        })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password)
            return res.status(400).json({
                message: "email , password not found"
            })
        await userValidate.validateAsync({ email, password });

        const user = await userSchema.findOne({ email })
        if (!user)
            return res.status(404).json({
                message: "user not found"
            })

        const check = await bcryptjs.compare(password, user.password)
        if (!check) {
            return res.status(400).json({
                message: "password incorrect"
            })
        }
        const token = jwt.sign({ userId: user?._id }, secretKey, { expiresIn: "2h" })

        return res.status(200).json({
            message: "Login successfully",
            data: user,
            token
        })
    } catch (err) {
        return res.status(500).json({
            err: err.message
        })
    }
}


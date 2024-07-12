const Joi = require("joi")

const regexEmail  =/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const userValidate = Joi.object({
    userName: Joi.string().min(3).max(20),
    email: Joi.string().pattern(regexEmail).email({
        minDomainSegments: 2, tlds: { allow: ['com', 'net'] }
    }).required(),
    password: Joi.string().min(8).max(20).required(),
})


module.exports = userValidate
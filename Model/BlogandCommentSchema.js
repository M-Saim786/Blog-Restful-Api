const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
}, { timestamps: true })

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    media: {
        type: String,
        // required: true
    },
    comments: [commentSchema]
})

module.exports = mongoose.model("Blogsposts", blogSchema)
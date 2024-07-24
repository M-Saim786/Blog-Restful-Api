const { default: mongoose } = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "user"
    }
}, { timestamps: true })

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    description: {
        type: String,
        required: false
    },
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    blogImg: {
        type: String,
        // required: true
    },
    comments: [commentSchema]
})

module.exports = mongoose.model("Blogsposts", blogSchema)
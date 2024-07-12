const BlogandCommentSchema = require("../Model/BlogandCommentSchema");

exports.createBlogPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description) {
            return res.status(400).json({
                message: "Title & description required"
            })
        }
        req.body.authorId = req.user._id;
        const blog = await BlogandCommentSchema(req.body).save();
        return res.status(200).json({
            message: "Blog added successfully",
            data: blog
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.getAllBlogs = async (req, res) => {
    try {

        const blogs = await BlogandCommentSchema.find();
        return res.status(200).json({
            data: blogs
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.updateBlog = async (req, res) => {
    try {
        const blogId = req.query.id;
        const blog = await BlogandCommentSchema.findOne({ _id: blogId });
        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }

        const updates = {};
        for (const field in req.body) {
            if (req.body[field] !== undefined && req.body[field] !== "") {
                updates[field] = req.body[field];
            }
        }

        if (!Object.keys(updates).length) {
            return res.status(400).json({ message: "No valid update fields provided" });
        }

        await BlogandCommentSchema.findOneAndUpdate({ _id: blogId }, req.body);
        return res.status(200).json({
            message: "Blog Updated"
        })


        return res.status(200).json({
            data: blogs
        })

    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}

exports.deleteBlog = async (req, res) => {
    try {
        const blogToDelete = await BlogandCommentSchema.findOneAndDelete(req.query.id)
        if (!blogToDelete) {
            return res.statuss(400).json({
                message: "Blog not found"
            })
        }
        return res.status(200).json({
            message: "Blog deleted successfully"
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }

}
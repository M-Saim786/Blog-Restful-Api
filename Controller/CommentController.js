const BlogandCommentSchema = require("../Model/BlogandCommentSchema");

exports.addComment = async (req, res) => {
    try {
        const { comment, blogId } = req.body;
        if (!comment) {
            return res.status(400).json({
                message: "comment not found"
            })
        }
        const checkBlog = await BlogandCommentSchema.findById(blogId)
        if (!checkBlog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }
        // console.log(req.user)
        console.log(comment)
        checkBlog.comments.push({ comment, userId: req.user.id })
        const newBlog = await checkBlog.save();
        return res.status(200).json({
            data: newBlog,
            status: true
        })






    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}


exports.updateComment = async (req, res) => {
    try {
        const { comment, blogId } = req.body;
        if (!comment) {
            return res.status(400).json({
                message: "comment not found"
            })
        }
        if (!blogId) {
            return res.status(400).json({
                message: "blog id not found"
            })
        }

        const checkBlog = await BlogandCommentSchema.findById(blogId)
        if (!checkBlog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }
// console.log(req.query.id)
        const commentToUpdate = checkBlog.comments.id(req.query.id)
        if (!commentToUpdate) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }
        commentToUpdate.comment = comment;

        const updatedBlog = await checkBlog.save();
        return res.status(200).json({
            data: updatedBlog,
            status: true
        });


    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}



exports.deleteComment = async (req, res) => {
    try {
        const { blogId } = req.body;
        if (!blogId) {
            return res.status(400).json({
                message: "blog id not found"
            })
        }

        const checkBlog = await BlogandCommentSchema.findById(blogId)
        if (!checkBlog) {
            return res.status(404).json({
                message: "Blog not found"
            })
        }

        // Find the index of the comment within the blog's comments array
        const commentIndex = checkBlog.comments.findIndex(comment => comment._id.toString() === req.query.id);
        if (commentIndex === -1) {
            return res.status(404).json({
                message: "Comment not found"
            });
        }

        checkBlog.comments.splice(commentIndex, 1)
        // commentToRemove.remove();

        const updatedBlog = await checkBlog.save();
        return res.status(200).json({
            message: "comment deleted successfully"
            // data: updatedBlog,
            // status: true
        });


    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
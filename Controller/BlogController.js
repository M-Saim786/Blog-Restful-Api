exports.createBlogPost = async (req, res) => {
    try {
        const { title, desc } = req.body;
        if (!title || !desc) {
            return res.status(400).json({
                message: "Title & desc required"
            })
        }


    } catch (err) {
        return res.status(500).json({
            message: err.message
        })
    }
}
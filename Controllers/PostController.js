import PostModel from "../Models/postModel.js";


// Create a new Post
export const createPost = async (req, res) => {
    const { desc, image, userId } = req.body;

    if (!userId || !desc) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const newPost = new PostModel({ desc, image, userId });

    try {
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a Post by ID
export const getPost = async (req, res) => {
    const id = req.params.id;

    try {
        const post = await PostModel.findById(id);
        if (!post) return res.status(404).json({ message: "Post not found" });
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


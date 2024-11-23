import { io } from "../index.js"; // Import the io object from index.js
import CommentModel from "../Models/CommentModel.js";
import PostModel from "../Models/PostModel.js";

// Add a comment to a post
export const addComment = async (req, res) => {
    const { text, postId } = req.body;

    if (!text || !postId) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        // Check if post exists
        const postExists = await PostModel.findById(postId);
        if (!postExists) {
            return res.status(404).json({ message: "Post not found" });
        }

        const newComment = new CommentModel({
            text,
            post: postId,
            user: req.user.id,
        });

        const savedComment = await newComment.save();

        // Emit the new comment to all connected clients
        io.emit("newComment", savedComment);

        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all comments for a post
export const getComments = async (req, res) => {
    const postId = req.params.postId;

    try {
        const comments = await CommentModel.find({ post: postId }).populate(
            "user",
            "name email"
        );
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

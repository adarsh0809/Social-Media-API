import express from "express";
import { addComment, getComments } from "../Controllers/CommentsController.js";
import { authMiddleware } from "../Middlerware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addComment); // Add a comment
router.get("/:postId", getComments); // Get comments for a post

export default router;


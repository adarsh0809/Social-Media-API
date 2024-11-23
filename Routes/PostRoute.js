import express from "express";
import { createPost, getPost } from "../Controllers/PostController.js";
import { authMiddleware } from "../Middlerware/authMiddleware.js";
const router = express.Router()

router.post('/',authMiddleware , createPost)
router.get('/:id', getPost)


export default router;
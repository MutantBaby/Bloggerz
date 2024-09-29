import { Router } from "express";
import {
  addComment,
  editComment,
  deleteComment,
  getCommentsByBlog,
} from "../controller/comment-controller.js";
import authMiddleware from "../middleware/auth-middleware.js";

const router = Router();

router.route("/:blogId").get(getCommentsByBlog);

router.route("/:blogId").post(authMiddleware, addComment);

router.route("/:commentId").put(authMiddleware, editComment);

router.route("/:commentId").delete(authMiddleware, deleteComment);

export default router;

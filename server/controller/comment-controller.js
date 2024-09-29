import Comment from "../models/comment-model.js";
import Blog from "../models/blog-model.js";
import chalk from "chalk";

const addComment = async (req, res) => {
  try {
    const body = req.body;
    const { blogId } = req.params;
    const user = req.user;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    const comment = new Comment({
      body: body.content,
      blog: blogId,
      author: user._id,
    });

    await comment.save();

    res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    console.log(chalk.magenta(`[addComment] ${error.message}`));
    res.status(500).json({ message: "Server error" });
  }
};

const editComment = async (req, res) => {
  try {
    const user = req.user;
    const body = req.body;
    const { commentId } = req.params;

    const comment = await Comment.findById(commentId);
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.author.toString() !== user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    comment.body = body?.content;
    await comment.save();

    res.status(200).json({ message: "Comment updated", comment });
  } catch (error) {
    console.log(chalk.magenta(`[editComment] ${error.message}`));
    res.status(500).json({ message: "Server error" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const user = req.user;

    const comment = await Comment.findById(commentId);

    if (!comment) return res.status(404).json({ message: "Comment not found" });
    if (comment.author.toString() !== user._id.toString())
      return res.status(403).json({ message: "Unauthorized" });

    await comment.deleteOne();

    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.log(chalk.magenta(`[deleteComment] ${error.message}`));
    res.status(500).json({ message: "Server error" });
  }
};

const getCommentsByBlog = async (req, res) => {
  try {
    const { blogId } = req.params;
    const comments = await Comment.find({ blog: blogId }).populate("author");

    if (comments.length === 0)
      return res
        .status(200)
        .json({ comments: [], message: "No comments found" });

    res.status(200).json(comments);
  } catch (error) {
    console.log(chalk.magenta(`[getCommentsByBlog] ${error.message}`));
    res.status(500).json({ message: "Server error" });
  }
};

export { addComment, editComment, deleteComment, getCommentsByBlog };

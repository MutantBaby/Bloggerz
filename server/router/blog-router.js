import { Router } from "express";
import {
  blogs,
  count,
  travel,
  feature,
  politics,
  userBlog,
  editBlog,
  singleBlog,
  createBlog,
  deleteBlog,
} from "../controller/blog-controller.js";

const router = Router();

router.route("/user").post(userBlog);
router.route("/create").post(createBlog);
router.route("/single").post(singleBlog);

router.route("/count").get(count);
router.route("/blogs").post(blogs);
router.route("/travel").get(travel);
router.route("/edit").put(editBlog);
router.route("/feature").get(feature);
router.route("/politics").get(politics);

router.route("/delete").delete(deleteBlog);

export default router;

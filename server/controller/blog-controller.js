import chalk from "chalk";
import Blog from "../models/blog-model.js";
import Author from "../models/auth-model.js";

const createBlog = async (req, res) => {
  try {
    const { title, body, image, category, author } = await req.body;
    const blog = new Blog({ title, body, image, category, author });
    const savedBlog = await blog.save();
    console.log(chalk.cyan(`created ${savedBlog._id}`));
    res.status(201).json({ message: "Blog Posted" });
  } catch (error) {
    console.log(chalk.magenta(`[blog-controller] ${error.message}`));
    res.status(400).json({ message: error.message });
  }
};

// Specific users blog
const userBlog = async (req, res) => {
  try {
    const { id } = await req.body;
    const blogs = await Blog.find({ author: id }).populate("author");
    res.status(200).json(blogs);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const travel = async (req, res) => {
  try {
    const travelBlogs = await Blog.find({ category: "Travel" }).populate(
      "author"
    );
    if (travelBlogs) {
      res.status(200).json(travelBlogs);
    } else {
      res.status(404).json({ message: "Empty!" });
    }
  } catch (error) {
    console.log(chalk.magenta(`[travel] ${error.message}`));
    res.status(400).json({ message: error.message });
  }
};

const politics = async (req, res) => {
  try {
    const politicsBlogs = await Blog.find({ category: "Politics" }).populate(
      "author"
    );

    if (politicsBlogs) res.status(200).json(politicsBlogs);
    else res.status(404).json({ message: "Empty!" });
  } catch (error) {
    console.log(chalk.magenta(`[politics] ${error.message}`));
    res.status(400).json({ message: error.message });
  }
};

const feature = async (req, res) => {
  try {
    const random_Index = Math.round(Math.random() * 1);
    console.log(random_Index);
    const featureBlogs = await Blog.findOne()
      .skip(random_Index)
      .populate("author");

    if (featureBlogs) res.status(200).json(featureBlogs);
    else res.status(404).json({ message: "Empty!" });
  } catch (error) {
    console.log(chalk.magenta(`[feature] ${error.message}`));
    res.status(400).json({ message: error.message });
  }
};

const blogs = async (req, res) => {
  try {
    const { blog_limit } = await req.body;
    const blooogs = await Blog.find().limit(blog_limit).populate("author");
    res.status(200).json(blooogs.reverse());
  } catch (error) {
    console.log(chalk.magenta(`[blogs] ${error.message}`));
    res.status(400).json({ message: error.message });
  }
};

const editBlog = async (req, res) => {
  try {
    const { id, title, body } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, body },
      { new: true }
    );

    if (updatedBlog)
      res.status(200).json({ message: "Blog updated successfully" });
    else res.status(404).json({ message: "Blog not found" });
  } catch (error) {
    console.log(chalk.magenta(`[editBlog] ${error.message}`));
    res.status(400).json({ message: error.message });
  }
};

const count = async (req, res) => {
  try {
    const travel = await Blog.find({ category: "Travel" });
    const politics = await Blog.find({ category: "Politics" });

    res.status(200).json([
      {
        category: "travel",
        count: travel.length,
      },
      {
        category: "politics",
        count: politics.length,
      },
    ]);
  } catch (error) {
    console.log(chalk.magenta(`[count] ${error.message}`));
    res.status(400).json({ message: error.message });
  }
};

const singleBlog = async (req, res) => {
  try {
    const { id } = await req.body;
    const blog = await Blog.findById(id).populate("author");

    if (blog) res.status(200).json(blog);
    else res.status(404).json({ message: "Not found!" });
  } catch (error) {
    console.log(chalk.magenta(`[singleBlog] ${error.message}`));
    res.status(400).json({ message: error.message });
  }
};

const deleteBlog = async (req, res) => {
  try {
    const { id } = await req.body;
    const deleted = await Blog.findByIdAndDelete(id);

    if (deleted) {
      console.log(`${deleted._id} deleted successfully`);
      res.status(200).json({ message: "deleted successfully" });
    } else res.status(404).json({ message: "Not deleted!" });
  } catch (error) {
    console.log(chalk.magenta(`[deleteBlog] ${error.message}`));
    res.status(400).json({ message: error.message });
  }
};

export {
  blogs,
  count,
  travel,
  feature,
  userBlog,
  politics,
  editBlog,
  createBlog,
  singleBlog,
  deleteBlog,
};

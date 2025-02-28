const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

//  Get all blog posts
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
});

//   single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Post not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
});

//  Create a new blog post 
router.post("/", async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required" });
    }
    const newBlog = new Blog({ title, content, tags });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Error adding post", error });
  }
});



//  Delete a blog post
router.delete("/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
});

module.exports = router;

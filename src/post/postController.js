import Post from "./../../DB/Models/postModel.js";
import User from "./../../DB/Models/userModel.js";

export const createPost = async (req, res) => {
  try {
    const { title, content, UserId } = req.body;
    const post = await Post.create({ title, content, UserId });
    if (!post) return res.status(404).json({ message: "post not created" });
    return res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

//all posts of  specefic user
export const getAllUserPosts = async (req, res) => {
  try {
    const { id } = req.params;
    const posts = await Post.findAll({
      where: { UserId: id },
      attributes: ["content", "title"],
      include: {
        model: User,
        attributes: ["name", "email"],
      },
    });
    if (!posts[0])
      return res
        .status(404)
        .json({ message: "user don't have posts not found" });
    return res.status(200).json({ message: "posts of user is", data: posts });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

// specefic post
export const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.findOne({
    where: { id },
    attributes: ["title", "content"],
    include: {
      model: User,
      attributes: ["email", "name"],
    },
  });
  if (!post) return res.status(404).json({ message: "post not found" });
  return res.status(200).json({ message: "post is", data: post });
};

export const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await Post.update({ title, content }, { where: { id } });
    if (!post[0]) return res.status(404).json({ message: "post not found" });
    return res.status(200).json({ message: "post updated" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;
  const post = await Post.destroy({ where: { id } });
  if (!post) return res.status(404).json({ message: "post not found" });
  return res.status(200).json({ message: "post deleted" });
};

import Comment from "../../DB/Models/commentModel.js";
import Post from "./../../DB/Models/postModel.js";
import User from "../../DB/Models/userModel.js";

export const createComment = async (req, res) => {
  try {
    const { comment, PostId } = req.body;
    const { id } = req.params;

    const data = await Comment.create({
      comment,
      PostId,
      UserId: id,
    });
    return res.status(200).json({ message: "comment created successfully" });
  } catch (error) {
    return res.json({
      message: "error creating comment",
      error: error.message,
    });
  }
};

export const getComment = async (req, res) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findOne({
      attributes: ["comment"],
      where: { id },
      include: {
        model: Post,
        attributes: ["title", "content"],
        include: {
          model: User,
          attributes: ["name"],
        },
      },
    });
    if (!comment) return res.status(404).json({ message: "Comment not found" });
    return res.status(200).json({ message: "comment is:", comment });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;
    const updatedComment = await Comment.update({ comment }, { where: { id } });
    if (!updatedComment[0])
      return res.status(404).json({ message: "Comment not found" });
    return res.status(200).json({ message: "comment updated" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedComment = await Comment.destroy({ where: { id } });
    if (!deletedComment)
      return res.status(404).json({ message: "Comment not found" });
    return res.status(200).json({ message: "comment deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "internal server error", error: error.message });
  }
};

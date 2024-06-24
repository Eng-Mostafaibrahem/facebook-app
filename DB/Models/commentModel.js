import { DataTypes } from "sequelize";
import { sequalizeInstance } from "../dbConnection.js";
import User from "./userModel.js";
import Post from "./postModel.js";

const Comment = sequalizeInstance.define(
  "Comment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: true }
);

User.hasMany(Comment, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Comment.belongsTo(User);

Post.hasMany(Comment, {
  onUpdate: "CASCADE",
  onDelete: "CASCADE",
});
Comment.belongsTo(Post);

export default Comment;
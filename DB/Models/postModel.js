import { sequelize } from "../dbConnection.js";
import { DataTypes } from "sequelize";
import User from "./userModel.js";

const Post = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deletedAt: {
        type: DataTypes.DATE,
      },
  },
  { paranoid: true, timeStamp: true }
);

//association

Post.belongsTo(User);
User.hasMany(Post, {
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Post;

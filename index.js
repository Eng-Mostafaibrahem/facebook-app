import express from "express";
import { connectDB } from "./DB/dbConnection.js";
import userRoutes from "./src/user/user.routes.js";
import postRoutes from "./src/post/post.routes.js";
import commentRoutes from "./src/comment/comment.routes.js";
const app = express();

import { config } from "dotenv";

config();
app.use(express.json());
app.use("/user", userRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);

connectDB();
app.listen(
  process.env.PORT,
  console.log(`server listening on port ${process.env.PORT}`)
);

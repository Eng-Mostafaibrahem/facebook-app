import express from 'express';
import { testConnection } from './DB/dbConnection.js';
import userRoutes from "./src/user/user.routes.js"
import postRoutes from "./src/post/post.routes.js"
import commentRoutes from "./src/comment/comment.routes.js"
const app = express();
const port =8080;

app.use(express.json());
app.use("/user",userRoutes)
app.use("/post",postRoutes)
app.use("/comment",commentRoutes)

testConnection()
app.listen(port,console.log(`server listening on port ${port}`))
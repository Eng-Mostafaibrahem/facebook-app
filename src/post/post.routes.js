import { Router } from "express";
import * as postController from "./postController.js"
const routes = Router();

routes.post("/create",postController.createPost)
routes.put("/update/:id",postController.updatePost)
routes.get("/getallposts/:id",postController.getAllUserPosts)
routes.get("/getpost/:id",postController.getPost)
routes.delete("/deletepost/:id",postController.deletePost)







export default routes
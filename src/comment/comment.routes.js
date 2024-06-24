import{Router} from "express"
import * as commentControllers from "./commentController.js"
const routes= Router()

routes.post("/addcomment/:id",commentControllers.createComment)
routes.get("/getcomment/:id",commentControllers.getComment)
routes.put("/updatecomment/:id",commentControllers.updateComment)
routes.delete("/deletecomment/:id",commentControllers.deleteComment)


export default routes
import { Router } from "express";
import * as userController from "./userController.js"
const routes=Router();


routes.post("/signup",userController.signUp)
routes.put("/login",userController.login)
routes.put("/logout",userController.logout)





export default routes;
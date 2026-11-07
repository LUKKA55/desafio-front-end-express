import { Router, type Request, type Response } from "express";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";
import { validateBody } from "./user.validator.js";
import verifyJWT from "../middleware/verify-login/index.js";

const userRoutes = Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

userRoutes.get("/", verifyJWT, (req: Request, res: Response) => userController.getUser(req, res))
userRoutes.post("/login", validateBody, (req: Request, res: Response) => userController.login(req, res))
userRoutes.get("/verify-session", verifyJWT, (req: Request, res: Response) => res.status(200).send())

export default userRoutes
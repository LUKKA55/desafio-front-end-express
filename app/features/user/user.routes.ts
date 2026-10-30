import { Router, type Request, type Response } from "express";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";
import { validateBody } from "./user.validator.js";

const userRoutes = Router()

const userRepository = new UserRepository()
const userService = new UserService(userRepository)
const userController = new UserController(userService)

userRoutes.post("/login", validateBody, (req: Request, res: Response) => userController.login(req, res))

export default userRoutes
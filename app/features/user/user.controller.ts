import type { Request, Response } from "express";
import type { IUserService } from "./interfaces/service.js";

export class UserController {
    constructor(private userService : IUserService){}

    async login(req: Request, res: Response) {
        const { userName, password } = req.body

        const response = await this.userService.login(userName, password)

        return res
            .status(200)
            .json(response)
    }
}
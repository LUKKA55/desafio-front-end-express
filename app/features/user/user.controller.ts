import type { Request, Response } from "express";
import type { IUserService } from "./interfaces/service.js";

export class UserController {
    constructor(private userService : IUserService){}

    async login(req: Request, res: Response) {
        const { userName, password } = req.body

        const response = await this.userService.login(userName, password)

        if(!!response.token)
            return res
                .status(200)
                .cookie("token", response.token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'strict'
                })
                .json({ success: true, message: response.message })

        return res
            .status(200)
            .json({ success: false, message: response.message })
    }
}
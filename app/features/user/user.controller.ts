import type { Request, Response } from "express";
import type { UserService } from "./user.service.js";
import { responderErro } from "../../shared/erroApi.js";
import { envs } from "../../envs/index.js";
import { userTokenUtils } from "../utils/userTokenUtils.js";

export class UserController {
    constructor(private userService : UserService){}

    async login(req: Request, res: Response) {
        try {
            const { userName, password } = req.body

            const response = await this.userService.login(userName, password)
            const isProd = envs.NODE_ENV === "production";

            return res
                .status(200)
                .cookie("token", response.token, {
                    httpOnly: true,
                    secure: isProd,                    
                    sameSite: isProd ? "none" : "lax",
                    path: "/",
                })
                .json({ success: true, message: response.message })

        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async logout(req: Request, res: Response) {
        try {
            return res
            .clearCookie("token", { path: "/", httpOnly: true, sameSite: "lax", secure: true })
            .sendStatus(204);
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async getUser(req: Request, res: Response) {
        try {
            const token = req.cookies.token;
            const userToken = userTokenUtils(token)

            const user = await this.userService.getUserById(userToken.id)
            
            return res
                .status(200)
                .json({
                    id: user.id,
                    userName: user.name,
                    perfil: user.perfil 
                })

        } catch (erro) {
            return responderErro(res, erro)
        }
    }
}
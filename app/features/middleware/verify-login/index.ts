import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { envs } from "../../../envs/index.js";

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token)
        return res.status(401).json({ error: "Acesso negado. Token não fornecido." });

    try {
        jwt.verify(token, envs.JWT_SECRET);

        next();
    } catch (error) {
        return res.status(403).json({ error: "Token inválido ou expirado." });
    }
};

export default verifyJWT
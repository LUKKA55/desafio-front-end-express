import type { NextFunction, Request, Response } from "express";
import { userTokenUtils } from "../../utils/userTokenUtils.js";

const verifyAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        const { perfil } = userTokenUtils(req.cookies.token)

        if (perfil !== "ADMIN")
            return res.status(403).json({ errorMessages: ["Acesso permitido somente para a instituição."] });

        next();
    } catch (error) {
        return res.status(403).json({ errorMessages: ["Token inválido ou expirado."] });
    }
};

export default verifyAdmin

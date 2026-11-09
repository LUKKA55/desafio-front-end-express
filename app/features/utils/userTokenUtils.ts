import jwt from "jsonwebtoken";
import { envs } from "../../envs/index.js";

export interface IToken {
    id: number
    perfil: string
    user: string
}

export const userTokenUtils = (token: string) => {
    const decodedToken = jwt.verify(token, envs.JWT_SECRET as string) as IToken;

    return decodedToken
} 
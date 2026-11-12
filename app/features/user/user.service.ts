import jwt from "jsonwebtoken"
import { envs } from "../../envs/index.js";
import type { UserRepository } from "./user.repository.js";
import { ErroApi } from "../../shared/erroApi.js";

export class UserService {
    constructor(private userRepository : UserRepository) {}

    async login(userName: string, password: string): Promise<{message: string, token?: string}> {
        const user = await this.userRepository.getLogin(userName, password)

        if(!user)
            throw new ErroApi(404, "Usuário não encontrado.")
            
        const privateKey = envs.JWT_SECRET
        const token = jwt.sign({ user: userName, id: user.id, perfil: user.perfil }, privateKey, { expiresIn: '24h' });

        return {
            message: "Login realizado com sucesso.",
            token: token
        }
    }

    async getUserById(id: string) {
        const user = await this.userRepository.getUserById(id)

        if(!user)
            throw new ErroApi(404, "Usuário não encontrado.")

        return user
    }
}
import jwt from "jsonwebtoken"
import type { IUserRepository } from "./interfaces/repository.js";
import type { IUserService, ILoginModel } from "./interfaces/service.js";
import { envs } from "../../envs/index.js";

export class UserService implements IUserService {
    constructor(private userRepository : IUserRepository) {}

    async login(userName: string, password: string): Promise<ILoginModel> {
        const user = await this.userRepository.getLogin(userName, password)

        if(!user)
            return {
                message: "Usuário não encontrado."
            }

        const privateKey = envs.JWT_SECRET
        const token = jwt.sign({ user: userName, id: user.id, perfil: user.perfil }, privateKey, { expiresIn: '24h' });

        return {
            message: "Login realizado com sucesso.",
            token: token
        }
    }
}
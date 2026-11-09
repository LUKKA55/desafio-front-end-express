import { DatabaseConnection } from "../../../api/database.js";
import { UserEntity } from "../../database/entities/userEntity.js";

export class UserRepository {
    constructor() {}

    private get repositorio() {
        return DatabaseConnection.client.getRepository(UserEntity)
    } 

    async getLogin(userName: string, password: string): Promise<UserEntity|null> {
        return this.repositorio.findOne({ where: { name: userName, password: password }});
    }

    async getUserById(id: number) {
        return this.repositorio.findOne({ where: { id: id }});
    }
}
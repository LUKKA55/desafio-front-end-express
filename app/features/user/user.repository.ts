import { DatabaseConnection } from "../../../main/database.js";
import { UserEntity } from "../../database/entities/userEntity.js";
import type { IUserRepository } from "./interfaces/repository.js";

export class UserRepository implements IUserRepository {
    constructor() {}

    async getLogin(userName: string, password: string): Promise<UserEntity|null> {
        const loginUser = await DatabaseConnection.client
			.getRepository(UserEntity)
			.findOne({
				where: { name: userName, password: password },
			});

        return loginUser
    }
}
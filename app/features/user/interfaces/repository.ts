import type { UserEntity } from "../../../database/entities/userEntity.js"

export interface IUserRepository {
    getLogin(userName: string, password: string): Promise<UserEntity | null>
}
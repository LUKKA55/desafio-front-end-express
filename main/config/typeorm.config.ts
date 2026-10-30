import { DataSource } from "typeorm";
import { UserEntity } from "../../app/database/entities/userEntity.js";
import { envs } from "../../app/envs/index.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: envs.DATABASE_URL,
    synchronize: false,
    logging: true,
    entities: [UserEntity],
})
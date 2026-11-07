import { DataSource } from "typeorm";
import * as pg from "pg";
import { UserEntity } from "../../app/database/entities/userEntity.js";
import { envs } from "../../app/envs/index.js";
import { DisciplinaEntity } from "../../app/database/entities/disciplinaEntity.js";
import { ProfessorEntity } from "../../app/database/entities/professorEntity.js";
import { TurmaEntity } from "../../app/database/entities/turmaEntity.js";

export const AppDataSource = new DataSource({
    type: "postgres",
    url: envs.DATABASE_URL,
    driver: pg,
    synchronize: false,
    logging: true,
    entities: [UserEntity, DisciplinaEntity, ProfessorEntity, TurmaEntity],
})
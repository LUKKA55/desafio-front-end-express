import { DatabaseConnection } from "../../../api/database.js";
import { AlunoEntity } from "../../database/entities/alunoEntity.js";
import { AlunoTurmaEntity } from "../../database/entities/AlunoTurmaEntiry.js";
import { UserEntity } from "../../database/entities/userEntity.js";

export class MatriculaRepository {
    private get repositorio() {
        return DatabaseConnection.client.getRepository(AlunoTurmaEntity)
    }

    async listar(idUser: string): Promise<AlunoTurmaEntity[]> {
        return this.repositorio.find({ where: { 
            aluno: { userId: idUser} }, 
            relations: { 
                aluno: true, 
                turma: { 
                    disciplina: true,
                    professor:true 
                } 
            }})
    }

    async matricular(idTurma: string, idUser: string) {
        return DatabaseConnection.client.transaction(async (manager) => {
            const aluno = await manager.findOne(AlunoEntity, { where: { userId: idUser } })

            if (!aluno) {
                throw new Error("Aluno não encontrado")
            }

            const matricula = manager.create(AlunoTurmaEntity, {
                turmaId: idTurma,
                alunoId: aluno.id
            })

            return manager.save(matricula)
        })
    }

    async deleteMatricula(idMatricula: string): Promise<void> {
        await this.repositorio.delete(idMatricula)
    }
}

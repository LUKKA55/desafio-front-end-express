import { DatabaseConnection } from "../../../api/database.js";
import { TurmaEntity } from "../../database/entities/turmaEntity.js";
import { DisciplinaEntity } from "../../database/entities/disciplinaEntity.js";
import { ProfessorEntity } from "../../database/entities/professorEntity.js";

export interface ITurmaDados {
    disciplinaId: string
    professorId: string
    diaSemana: number
    turno: number
    vagas: number
    semestre: string
}

export class TurmaRepository {
    private get repositorio() {
        return DatabaseConnection.client.getRepository(TurmaEntity)
    }

    async listar(): Promise<TurmaEntity[]> {
        return this.repositorio.find({ order: { id: "ASC" } })
    }

    async buscarPorId(id: string): Promise<TurmaEntity | null> {
        return this.repositorio.findOneBy({ id })
    }

    async criar(dados: ITurmaDados): Promise<TurmaEntity> {
        return this.repositorio.save(this.repositorio.create(dados))
    }

    async atualizar(id: string, dados: ITurmaDados): Promise<TurmaEntity | null> {
        await this.repositorio.update(id, dados)
        return this.buscarPorId(id)
    }

    async excluir(id: string): Promise<void> {
        await this.repositorio.delete(id)
    }

    async buscarConflito(dados: ITurmaDados, ignorarId?: string): Promise<TurmaEntity | null> {
        const turmas = await this.repositorio.findBy({
            professorId: dados.professorId,
            diaSemana: dados.diaSemana,
            turno: dados.turno,
            semestre: dados.semestre,
        })

        return turmas.find((turma) => turma.id !== ignorarId) ?? null
    }

    async existeDisciplina(id: string): Promise<boolean> {
        return DatabaseConnection.client.getRepository(DisciplinaEntity).existsBy({ id })
    }

    async existeProfessor(id: string): Promise<boolean> {
        return DatabaseConnection.client.getRepository(ProfessorEntity).existsBy({ id })
    }
}
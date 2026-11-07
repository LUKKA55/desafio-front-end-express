import { DatabaseConnection } from "../../../api/database.js";
import { ProfessorEntity } from "../../database/entities/professorEntity.js";

export interface IProfessorDados {
    nome: string
    email: string
}

export class ProfessorRepository {
    private get repositorio() {
        return DatabaseConnection.client.getRepository(ProfessorEntity)
    }

    async listar(): Promise<ProfessorEntity[]> {
        return this.repositorio.find({ order: { nome: "ASC" } })
    }

    async buscarPorId(id: string): Promise<ProfessorEntity | null> {
        return this.repositorio.findOneBy({ id })
    }

    async buscarPorEmail(email: string): Promise<ProfessorEntity | null> {
        return this.repositorio.findOneBy({ email })
    }

    async criar(dados: IProfessorDados): Promise<ProfessorEntity> {
        return this.repositorio.save(this.repositorio.create(dados))
    }

    async atualizar(id: string, dados: IProfessorDados): Promise<ProfessorEntity | null> {
        await this.repositorio.update(id, dados)
        return this.buscarPorId(id)
    }

    async excluir(id: string): Promise<void> {
        await this.repositorio.delete(id)
    }
}
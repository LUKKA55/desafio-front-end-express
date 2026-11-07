import { DatabaseConnection } from "../../../api/database.js";
import { DisciplinaEntity } from "../../database/entities/disciplinaEntity.js";

export interface IDisciplinaDados {
    codigo: string
    nome: string
    cargaHoraria: number
}

export class DisciplinaRepository {
    private get repositorio() {
        return DatabaseConnection.client.getRepository(DisciplinaEntity)
    }

    async listar(): Promise<DisciplinaEntity[]> {
        return this.repositorio.find({ order: { nome: "ASC" } })
    }

    async buscarPorId(id: string): Promise<DisciplinaEntity | null> {
        return this.repositorio.findOneBy({ id })
    }

    async buscarPorCodigo(codigo: string): Promise<DisciplinaEntity | null> {
        return this.repositorio.findOneBy({ codigo })
    }

    async criar(dados: IDisciplinaDados): Promise<DisciplinaEntity> {
        return this.repositorio.save(this.repositorio.create(dados))
    }

    async atualizar(id: string, dados: IDisciplinaDados): Promise<DisciplinaEntity | null> {
        await this.repositorio.update(id, dados)
        return this.buscarPorId(id)
    }

    async excluir(id: string): Promise<void> {
        await this.repositorio.delete(id)
    }
}
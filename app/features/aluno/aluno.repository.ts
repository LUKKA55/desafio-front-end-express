import { DatabaseConnection } from "../../../api/database.js";
import { AlunoEntity } from "../../database/entities/alunoEntity.js";
import { UserEntity } from "../../database/entities/userEntity.js";

export interface IAlunoDados {
    nome: string
    email: string
    matricula: string
    senha?: string
}

export interface INovoAluno {
    nome: string
    email: string
    matricula: string
    login: string
    senha: string
}

export class AlunoRepository {
    private get repositorio() {
        return DatabaseConnection.client.getRepository(AlunoEntity)
    }

    async listar(): Promise<AlunoEntity[]> {
        return this.repositorio.find({ relations: { user: true }, order: { nome: "ASC" } })
    }

    async buscarPorId(id: string): Promise<AlunoEntity | null> {
        return this.repositorio.findOne({ where: { id }, relations: { user: true } })
    }

    async buscarPorMatricula(matricula: string): Promise<AlunoEntity | null> {
        return this.repositorio.findOneBy({ matricula })
    }

    async existeLogin(login: string): Promise<boolean> {
        return DatabaseConnection.client.getRepository(UserEntity).existsBy({ name: login })
    }

    async criar(dados: INovoAluno): Promise<string> {
        return DatabaseConnection.client.transaction(async (manager) => {
            const user = await manager.save(manager.create(UserEntity, {
                name: dados.login,
                password: dados.senha,
                perfil: "ALUNO",
            }))

            const aluno = await manager.save(manager.create(AlunoEntity, {
                userId: String(user.id),
                matricula: dados.matricula,
                nome: dados.nome,
                email: dados.email,
            }))

            return aluno.id
        })
    }

    async atualizar(aluno: AlunoEntity, dados: IAlunoDados): Promise<void> {
        await DatabaseConnection.client.transaction(async (manager) => {
            await manager.update(AlunoEntity, aluno.id, {
                matricula: dados.matricula,
                nome: dados.nome,
                email: dados.email,
            })

            if (dados.senha)
                await manager.update(UserEntity, aluno.userId, { password: dados.senha })
        })
    }

    async excluir(aluno: AlunoEntity): Promise<void> {
        await DatabaseConnection.client.transaction(async (manager) => {
            await manager.delete(AlunoEntity, aluno.id)
            await manager.delete(UserEntity, aluno.userId)
        })
    }
}

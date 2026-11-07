import { ErroApi } from "../../shared/erroApi.js";
import type { ProfessorRepository, IProfessorDados } from "./professor.repository.js";

export class ProfessorService {
    constructor(private professorRepository: ProfessorRepository) {}

    listar() {
        return this.professorRepository.listar()
    }

    async buscar(id: string) {
        const professor = await this.professorRepository.buscarPorId(id)

        if (!professor)
            throw new ErroApi(404, "Professor não encontrado.")

        return professor
    }

    async criar(dados: IProfessorDados) {
        await this.validarEmail(dados.email)
        return this.professorRepository.criar(dados)
    }

    async atualizar(id: string, dados: IProfessorDados) {
        await this.buscar(id)
        await this.validarEmail(dados.email, id)
        return this.professorRepository.atualizar(id, dados)
    }

    async excluir(id: string) {
        await this.buscar(id)
        await this.professorRepository.excluir(id)
    }

    private async validarEmail(email: string, idAtual?: string) {
        const existente = await this.professorRepository.buscarPorEmail(email)

        if (existente && existente.id !== idAtual)
            throw new ErroApi(409, `Já existe uma professor com o email ${email}.`)
    }
}
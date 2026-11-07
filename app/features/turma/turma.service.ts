import { ErroApi } from "../../shared/erroApi.js";
import type { ITurmaDados, TurmaRepository } from "./turma.repository.js";

export class TurmaService {
    constructor(private turmaRepository: TurmaRepository) {}

    listar() {
        return this.turmaRepository.listar()
    }

    async buscar(id: string) {
        const turma = await this.turmaRepository.buscarPorId(id)

        if (!turma)
            throw new ErroApi(404, "Turma não encontrada.")

        return turma
    }

    async criar(dados: ITurmaDados) {
        await this.validarRegras(dados)
        return this.turmaRepository.criar(dados)
    }

    async atualizar(id: string, dados: ITurmaDados) {
        await this.buscar(id)
        await this.validarRegras(dados, id)
        return this.turmaRepository.atualizar(id, dados)
    }

    async excluir(id: string) {
        await this.buscar(id)
        await this.turmaRepository.excluir(id)
    }

    private async validarRegras(dados: ITurmaDados, idAtual?: string) {
        if (!(await this.turmaRepository.existeDisciplina(dados.disciplinaId)))
            throw new ErroApi(404, "Disciplina não encontrada.")

        if (!(await this.turmaRepository.existeProfessor(dados.professorId)))
            throw new ErroApi(404, "Professor não encontrado.")

        const conflito = await this.turmaRepository.buscarConflito(dados, idAtual)

        if (conflito)
            throw new ErroApi(409, `O professor já tem uma turma no horário ${dados.diaSemana}${dados.turno}.`)
    }
}
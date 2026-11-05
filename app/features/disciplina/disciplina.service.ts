import { ErroApi } from "../../shared/erroApi.js";
import type { DisciplinaRepository, IDisciplinaDados } from "./disciplina.repository.js";

export class DisciplinaService {
    constructor(private disciplinaRepository: DisciplinaRepository) {}

    listar() {
        return this.disciplinaRepository.listar()
    }

    async buscar(id: string) {
        const disciplina = await this.disciplinaRepository.buscarPorId(id)

        if (!disciplina)
            throw new ErroApi(404, "Disciplina não encontrada.")

        return disciplina
    }

    async criar(dados: IDisciplinaDados) {
        await this.validarCodigo(dados.codigo)
        return this.disciplinaRepository.criar(dados)
    }

    async atualizar(id: string, dados: IDisciplinaDados) {
        await this.buscar(id)
        await this.validarCodigo(dados.codigo, id)
        return this.disciplinaRepository.atualizar(id, dados)
    }

    async excluir(id: string) {
        await this.buscar(id)
        await this.disciplinaRepository.excluir(id)
    }

    private async validarCodigo(codigo: string, idAtual?: string) {
        const existente = await this.disciplinaRepository.buscarPorCodigo(codigo)

        if (existente && existente.id !== idAtual)
            throw new ErroApi(409, `Já existe uma disciplina com o código ${codigo}.`)
    }
}
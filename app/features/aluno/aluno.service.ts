import { ErroApi } from "../../shared/erroApi.js";
import type { AlunoEntity } from "../../database/entities/alunoEntity.js";
import type { AlunoRepository, IAlunoDados } from "./aluno.repository.js";

const DOMINIO_INSTITUCIONAL = "unimatriculas.edu.br"

export interface IAlunoResposta {
    id: string
    nome: string
    email: string
    matricula: string
    emailInstitucional: string
}

const paraResposta = (aluno: AlunoEntity): IAlunoResposta => ({
    id: aluno.id,
    nome: aluno.nome,
    email: aluno.email,
    matricula: aluno.matricula,
    emailInstitucional: aluno.user.name,
})

export class AlunoService {
    constructor(private alunoRepository: AlunoRepository) {}

    async listar() {
        const alunos = await this.alunoRepository.listar()
        return alunos.map(paraResposta)
    }

    async buscar(id: string) {
        return paraResposta(await this.buscarEntidade(id))
    }

    async criar(dados: IAlunoDados) {
        await this.validarMatricula(dados.matricula)

        const login = await this.gerarEmailInstitucional(dados.nome)

        const id = await this.alunoRepository.criar({
            nome: dados.nome,
            email: dados.email,
            matricula: dados.matricula,
            login,
            senha: dados.senha ?? "",
        })

        return this.buscar(id)
    }

    async atualizar(id: string, dados: IAlunoDados) {
        const aluno = await this.buscarEntidade(id)
        await this.validarMatricula(dados.matricula, id)
        await this.alunoRepository.atualizar(aluno, dados)
        return this.buscar(id)
    }

    async excluir(id: string) {
        const aluno = await this.buscarEntidade(id)
        await this.alunoRepository.excluir(aluno)
    }

    private async buscarEntidade(id: string) {
        const aluno = await this.alunoRepository.buscarPorId(id)

        if (!aluno)
            throw new ErroApi(404, "Aluno não encontrado.")

        return aluno
    }

    private async validarMatricula(matricula: string, idAtual?: string) {
        const existente = await this.alunoRepository.buscarPorMatricula(matricula)

        if (existente && existente.id !== idAtual)
            throw new ErroApi(409, `Já existe um aluno com a matrícula ${matricula}.`)
    }

    private async gerarEmailInstitucional(nome: string) {
        const partes = nome
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .toLowerCase()
            .replace(/[^a-z\s]/g, "")
            .trim()
            .split(/\s+/)

        const base = (partes.length > 1 ? `${partes[0]}.${partes[partes.length - 1]}` : partes[0]).slice(0, 60)

        let login = `${base}@${DOMINIO_INSTITUCIONAL}`
        let numero = 2

        while (await this.alunoRepository.existeLogin(login)) {
            login = `${base}${numero}@${DOMINIO_INSTITUCIONAL}`
            numero++
        }

        return login
    }
}

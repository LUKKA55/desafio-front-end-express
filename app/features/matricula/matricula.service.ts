import { ErroApi } from "../../shared/erroApi.js";
import type { AlunoEntity } from "../../database/entities/alunoEntity.js";
import type { MatriculaRepository } from "./matricula.repository.js";
import type { AlunoTurmaEntity } from "../../database/entities/AlunoTurmaEntiry.js";

export interface IMatricula {
    id: string
    idTurma: string
    professor: string
    disciplina: string
    diaSemana: number
    turno: number
    semestre: string
    codDisciplina: string
}

const paraResposta = (alunoTurma: AlunoTurmaEntity): IMatricula => ({
    id: alunoTurma.id,
    idTurma: alunoTurma.turma.id,
    professor: alunoTurma.turma.professor.nome,
    disciplina: alunoTurma.turma.disciplina.nome,
    diaSemana: alunoTurma.turma.diaSemana,
    turno: alunoTurma.turma.turno,
    semestre: alunoTurma.turma.semestre,
    codDisciplina: alunoTurma.turma.disciplina.codigo
})

export class MatriculaService {
    constructor(private matriculaRepository: MatriculaRepository) {}

    async listar(idUser: string) {
        const matriculas = await this.matriculaRepository.listar(idUser)
        return matriculas.map(paraResposta)
    }

    async matricular(idTurma: string, idUser: string) {
        return await this.matriculaRepository.matricular(idTurma, idUser)
    }

    async deleteMatricula(idMatricula: string) {
        await this.matriculaRepository.deleteMatricula(idMatricula)
    }
}

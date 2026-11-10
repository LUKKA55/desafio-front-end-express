import type { Request, Response } from "express";
import type { AlunoService } from "./aluno.service.js";
import { responderErro } from "../../shared/erroApi.js";

export class AlunoController {
    constructor(private alunoService: AlunoService) {}

    async listar(req: Request, res: Response) {
        try {
            const alunos = await this.alunoService.listar()
            return res.status(200).json(alunos)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async buscar(req: Request<{ id: string }>, res: Response) {
        try {
            const aluno = await this.alunoService.buscar(req.params.id)
            return res.status(200).json(aluno)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async criar(req: Request, res: Response) {
        try {
            const aluno = await this.alunoService.criar(req.body)
            return res.status(201).json(aluno)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async atualizar(req: Request<{ id: string }>, res: Response) {
        try {
            const aluno = await this.alunoService.atualizar(req.params.id, req.body)
            return res.status(200).json(aluno)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async excluir(req: Request<{ id: string }>, res: Response) {
        try {
            await this.alunoService.excluir(req.params.id)
            return res.status(204).send()
        } catch (erro) {
            return responderErro(res, erro)
        }
    }
}

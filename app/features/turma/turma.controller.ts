import type { Request, Response } from "express";
import type { TurmaService } from "./turma.service.js";
import { responderErro } from "../../shared/erroApi.js";

export class TurmaController {
    constructor(private turmaService: TurmaService) {}

    async listar(req: Request, res: Response) {
        try {
            const turmas = await this.turmaService.listar()
            return res.status(200).json(turmas)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async buscar(req: Request<{ id: string }>, res: Response) {
        try {
            const turma = await this.turmaService.buscar(req.params.id)
            return res.status(200).json(turma)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async criar(req: Request, res: Response) {
        try {
            const turma = await this.turmaService.criar(req.body)
            return res.status(201).json(turma)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async atualizar(req: Request<{ id: string }>, res: Response) {
        try {
            const turma = await this.turmaService.atualizar(req.params.id, req.body)
            return res.status(200).json(turma)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async excluir(req: Request<{ id: string }>, res: Response) {
        try {
            await this.turmaService.excluir(req.params.id)
            return res.status(204).send()
        } catch (erro) {
            return responderErro(res, erro)
        }
    }
}
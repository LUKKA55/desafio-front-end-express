import type { Request, Response } from "express";
import type { ProfessorService } from "./professor.service.js";
import { responderErro } from "../../shared/erroApi.js";

export class ProfessorController {
    constructor(private professorService: ProfessorService) {}

    async listar(req: Request, res: Response) {
        try {
            const professors = await this.professorService.listar()
            return res.status(200).json(professors)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async buscar(req: Request<{ id: string }>, res: Response) {
        try {
            const professor = await this.professorService.buscar(req.params.id)
            return res.status(200).json(professor)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async criar(req: Request, res: Response) {
        try {
            const professor = await this.professorService.criar(req.body)
            return res.status(201).json(professor)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async atualizar(req: Request<{ id: string }>, res: Response) {
        try {
            const professor = await this.professorService.atualizar(req.params.id, req.body)
            return res.status(200).json(professor)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async excluir(req: Request<{ id: string }>, res: Response) {
        try {
            await this.professorService.excluir(req.params.id)
            return res.status(204).send()
        } catch (erro) {
            return responderErro(res, erro)
        }
    }
}
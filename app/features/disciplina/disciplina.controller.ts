import type { Request, Response } from "express";
import type { DisciplinaService } from "./disciplina.service.js";
import { responderErro } from "../../shared/erroApi.js";

export class DisciplinaController {
    constructor(private disciplinaService: DisciplinaService) {}

    async listar(req: Request, res: Response) {
        try {
            const disciplinas = await this.disciplinaService.listar()
            return res.status(200).json(disciplinas)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async buscar(req: Request<{ id: string }>, res: Response) {
        try {
            const disciplina = await this.disciplinaService.buscar(req.params.id)
            return res.status(200).json(disciplina)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async criar(req: Request, res: Response) {
        try {
            const disciplina = await this.disciplinaService.criar(req.body)
            return res.status(201).json(disciplina)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async atualizar(req: Request<{ id: string }>, res: Response) {
        try {
            const disciplina = await this.disciplinaService.atualizar(req.params.id, req.body)
            return res.status(200).json(disciplina)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async excluir(req: Request<{ id: string }>, res: Response) {
        try {
            await this.disciplinaService.excluir(req.params.id)
            return res.status(204).send()
        } catch (erro) {
            return responderErro(res, erro)
        }
    }
}
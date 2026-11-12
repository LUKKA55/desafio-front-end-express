import type { Request, Response } from "express";
import type { MatriculaService } from "./matricula.service.js";
import { responderErro } from "../../shared/erroApi.js";
import { userTokenUtils } from "../utils/userTokenUtils.js";

export class MatriculaController {
    constructor(private matriculaService: MatriculaService) {}

    async listar(req: Request, res: Response) {
        try {
            const token = req.cookies.token
            const userToken = userTokenUtils(token)

            const matriculas = await this.matriculaService.listar(userToken.id)
            return res.status(200).json(matriculas)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async matricular(req: Request<{ id: string }>, res: Response) {
        try {
            const token = req.cookies.token
            const userToken = userTokenUtils(token)

            const matricula = await this.matriculaService.matricular(req.params.id, userToken.id)
            return res.status(200).json(matricula)
        } catch (erro) {
            return responderErro(res, erro)
        }
    }

    async deleteMatricula(req: Request<{ id: string }>, res: Response) {
        try {
            await this.matriculaService.deleteMatricula(req.params.id)
            return res.status(204).send()
        } catch (erro) {
            return responderErro(res, erro)
        }
    }
}

import { Router, type Request, type Response } from "express";
import { MatriculaRepository } from "./matricula.repository.js";
import { MatriculaService } from "./matricula.service.js";
import { MatriculaController } from "./matricula.controller.js";
import {  } from "./matricula.validator.js";
import verifyJWT from "../middleware/verify-login/index.js";

const matriculaRoutes = Router()

const matriculaRepository = new MatriculaRepository()
const matriculaService = new MatriculaService(matriculaRepository)
const matriculaController = new MatriculaController(matriculaService)

matriculaRoutes.get("/", [ verifyJWT ], (req: Request, res: Response) => matriculaController.listar(req, res))
matriculaRoutes.post("/:id", [ verifyJWT ], (req: Request<{ id: string }>, res: Response) => matriculaController.matricular(req, res))
matriculaRoutes.delete("/:id", [ verifyJWT ], (req: Request<{ id: string }>, res: Response) => matriculaController.deleteMatricula(req, res))

export default matriculaRoutes

import { Router, type Request, type Response } from "express";
import { TurmaRepository } from "./turma.repository.js";
import { TurmaService } from "./turma.service.js";
import { TurmaController } from "./turma.controller.js";
import { validateTurma } from "./turma.validator.js";
import verifyJWT from "../middleware/verify-login/index.js";

const turmaRoutes = Router()

const turmaRepository = new TurmaRepository()
const turmaService = new TurmaService(turmaRepository)
const turmaController = new TurmaController(turmaService)

turmaRoutes.get("/", verifyJWT, (req: Request, res: Response) => turmaController.listar(req, res))
turmaRoutes.get("/:id", verifyJWT, (req: Request<{ id: string }>, res: Response) => turmaController.buscar(req, res))
turmaRoutes.post("/", [ verifyJWT, validateTurma ], (req: Request, res: Response) => turmaController.criar(req, res))
turmaRoutes.put("/:id", [ verifyJWT, validateTurma ], (req: Request<{ id: string }>, res: Response) => turmaController.atualizar(req, res))
turmaRoutes.delete("/:id", verifyJWT, (req: Request<{ id: string }>, res: Response) => turmaController.excluir(req, res))

export default turmaRoutes
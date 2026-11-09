import { Router, type Request, type Response } from "express";
import { DisciplinaRepository } from "./disciplina.repository.js";
import { DisciplinaService } from "./disciplina.service.js";
import { DisciplinaController } from "./disciplina.controller.js";
import { validateDisciplina } from "./disciplina.validator.js";
import verifyJWT from "../middleware/verify-login/index.js";

const disciplinaRoutes = Router()

const disciplinaRepository = new DisciplinaRepository()
const disciplinaService = new DisciplinaService(disciplinaRepository)
const disciplinaController = new DisciplinaController(disciplinaService)

disciplinaRoutes.get("/", verifyJWT, (req: Request, res: Response) => disciplinaController.listar(req, res))
disciplinaRoutes.get("/:id", verifyJWT, (req: Request<{ id: string }>, res: Response) => disciplinaController.buscar(req, res))
disciplinaRoutes.post("/", [ verifyJWT, validateDisciplina ], (req: Request, res: Response) => disciplinaController.criar(req, res))
disciplinaRoutes.put("/:id", [ verifyJWT, validateDisciplina ], (req: Request<{ id: string }>, res: Response) => disciplinaController.atualizar(req, res))
disciplinaRoutes.delete("/:id", verifyJWT, (req: Request<{ id: string }>, res: Response) => disciplinaController.excluir(req, res))

export default disciplinaRoutes
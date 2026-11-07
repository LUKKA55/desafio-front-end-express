import { Router, type Request, type Response } from "express";
import { DisciplinaRepository } from "./disciplina.repository.js";
import { DisciplinaService } from "./disciplina.service.js";
import { DisciplinaController } from "./disciplina.controller.js";
import { validateDisciplina } from "./disciplina.validator.js";

const disciplinaRoutes = Router()

const disciplinaRepository = new DisciplinaRepository()
const disciplinaService = new DisciplinaService(disciplinaRepository)
const disciplinaController = new DisciplinaController(disciplinaService)

disciplinaRoutes.get("/", (req: Request, res: Response) => disciplinaController.listar(req, res))
disciplinaRoutes.get("/:id", (req: Request<{ id: string }>, res: Response) => disciplinaController.buscar(req, res))
disciplinaRoutes.post("/", validateDisciplina, (req: Request, res: Response) => disciplinaController.criar(req, res))
disciplinaRoutes.put("/:id", validateDisciplina, (req: Request<{ id: string }>, res: Response) => disciplinaController.atualizar(req, res))
disciplinaRoutes.delete("/:id", (req: Request<{ id: string }>, res: Response) => disciplinaController.excluir(req, res))

export default disciplinaRoutes
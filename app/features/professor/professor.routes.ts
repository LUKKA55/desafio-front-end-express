import { Router, type Request, type Response } from "express";
import { ProfessorRepository } from "./professor.repository.js";
import { ProfessorService } from "./professor.service.js";
import { ProfessorController } from "./professor.controller.js";
import { validateProfessor } from "./professor.validator.js";

const professorRoutes = Router()

const professorRepository = new ProfessorRepository()
const professorService = new ProfessorService(professorRepository)
const professorController = new ProfessorController(professorService)

professorRoutes.get("/", (req: Request, res: Response) => professorController.listar(req, res))
professorRoutes.get("/:id", (req: Request<{ id: string }>, res: Response) => professorController.buscar(req, res))
professorRoutes.post("/", validateProfessor, (req: Request, res: Response) => professorController.criar(req, res))
professorRoutes.put("/:id", validateProfessor, (req: Request<{ id: string }>, res: Response) => professorController.atualizar(req, res))
professorRoutes.delete("/:id", (req: Request<{ id: string }>, res: Response) => professorController.excluir(req, res))

export default professorRoutes
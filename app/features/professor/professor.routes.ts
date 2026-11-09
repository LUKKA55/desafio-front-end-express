import { Router, type Request, type Response } from "express";
import { ProfessorRepository } from "./professor.repository.js";
import { ProfessorService } from "./professor.service.js";
import { ProfessorController } from "./professor.controller.js";
import { validateProfessor } from "./professor.validator.js";
import verifyJWT from "../middleware/verify-login/index.js";

const professorRoutes = Router()

const professorRepository = new ProfessorRepository()
const professorService = new ProfessorService(professorRepository)
const professorController = new ProfessorController(professorService)

professorRoutes.get("/", verifyJWT, (req: Request, res: Response) => professorController.listar(req, res))
professorRoutes.get("/:id", verifyJWT, (req: Request<{ id: string }>, res: Response) => professorController.buscar(req, res))
professorRoutes.post("/", [ verifyJWT, validateProfessor ], (req: Request, res: Response) => professorController.criar(req, res))
professorRoutes.put("/:id", [ verifyJWT, validateProfessor ], (req: Request<{ id: string }>, res: Response) => professorController.atualizar(req, res))
professorRoutes.delete("/:id", verifyJWT, (req: Request<{ id: string }>, res: Response) => professorController.excluir(req, res))

export default professorRoutes
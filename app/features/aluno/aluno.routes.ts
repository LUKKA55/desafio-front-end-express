import { Router, type Request, type Response } from "express";
import { AlunoRepository } from "./aluno.repository.js";
import { AlunoService } from "./aluno.service.js";
import { AlunoController } from "./aluno.controller.js";
import { validateAtualizarAluno, validateCriarAluno } from "./aluno.validator.js";
import verifyJWT from "../middleware/verify-login/index.js";
import verifyAdmin from "../middleware/verify-admin/index.js";

const alunoRoutes = Router()

const alunoRepository = new AlunoRepository()
const alunoService = new AlunoService(alunoRepository)
const alunoController = new AlunoController(alunoService)

alunoRoutes.get("/", [ verifyJWT, verifyAdmin ], (req: Request, res: Response) => alunoController.listar(req, res))
alunoRoutes.get("/:id", [ verifyJWT, verifyAdmin ], (req: Request<{ id: string }>, res: Response) => alunoController.buscar(req, res))
alunoRoutes.post("/", [ verifyJWT, verifyAdmin, validateCriarAluno ], (req: Request, res: Response) => alunoController.criar(req, res))
alunoRoutes.put("/:id", [ verifyJWT, verifyAdmin, validateAtualizarAluno ], (req: Request<{ id: string }>, res: Response) => alunoController.atualizar(req, res))
alunoRoutes.delete("/:id", [ verifyJWT, verifyAdmin ], (req: Request<{ id: string }>, res: Response) => alunoController.excluir(req, res))

export default alunoRoutes

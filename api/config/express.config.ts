import express, {type Response, type Request} from 'express';
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from '../../app/features/user/user.routes.js';
import disciplinaRoutes from '../../app/features/disciplina/disciplina.routes.js';
import professorRoutes from '../../app/features/professor/professor.routes.js';
import turmaRoutes from '../../app/features/turma/turma.routes.js';
import alunoRoutes from '../../app/features/aluno/aluno.routes.js';

export const createServer = () => {
	const api = express();

	api.use(express.json())
	api.use(cors({credentials: true, origin: [/^http:\/\/localhost:\d+$/, "https://desafio-matriculas.vercel.app"] }))
	api.use(cookieParser())

	makeRoutes(api);
	return api;
};

const makeRoutes = (api: express.Application) => {
    api.use('/user', userRoutes)
	api.use('/disciplina', disciplinaRoutes)
	api.use('/professor', professorRoutes)
	api.use('/turma', turmaRoutes)
	api.use('/aluno', alunoRoutes)
};
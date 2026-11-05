import express, {type Response, type Request} from 'express';
import userRoutes from '../../app/features/user/user.routes.js';
import disciplinaRoutes from '../../app/features/disciplina/disciplina.routes.js';

export const createServer = () => {
	const api = express();

	api.use(express.json())

	makeRoutes(api);
	return api;
};

const makeRoutes = (api: express.Application) => {
    api.use('/user', userRoutes)
	api.use('/disciplina', disciplinaRoutes)
};
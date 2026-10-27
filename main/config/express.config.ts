import express, {type Response, type Request} from 'express';
import authRoutes from '../../app/features/auth/auth.routes.js';

export const createServer = () => {
	const api = express();

	makeRoutes(api);
	return api;
};

const makeRoutes = (api: express.Application) => {
    api.use('/auth', authRoutes)
};
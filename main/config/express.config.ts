import express, {type Response, type Request} from 'express';
import userRoutes from '../../app/features/user/user.routes.js';

export const createServer = () => {
	const api = express();

	api.use(express.json())

	makeRoutes(api);
	return api;
};

const makeRoutes = (api: express.Application) => {
    api.use('/user', userRoutes)
};
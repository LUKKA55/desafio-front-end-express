import express, {type Response, type Request} from 'express';
import cors from "cors"
import cookieParser from "cookie-parser"
import userRoutes from '../../app/features/user/user.routes.js';

export const createServer = () => {
	const api = express();

	api.use(express.json())
	api.use(cors({credentials: true, origin: /^http:\/\/localhost:\d+$/ }))
	api.use(cookieParser())

	makeRoutes(api);
	return api;
};

const makeRoutes = (api: express.Application) => {
    api.use('/user', userRoutes)
};
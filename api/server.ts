import { createServer } from "./config/express.config.js";

export const runServer = () => {
	const port = process.env.PORT || 9000;

	const api = createServer();

	api.listen(port, () => console.log(`server rodando na porta ${port}`));
};
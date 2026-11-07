import { DatabaseConnection } from "./database.js";
import { runServer } from "./server.js";

Promise.all([DatabaseConnection.connection()])
	.then(() => runServer())
	.catch((error) => {
		console.log(`Erro ao inicializar o servidor, message:${error}`);
	});
import { DatabaseConnection } from "../main/database.js";
import { runServer } from "../main/server.js";

Promise.all([DatabaseConnection.connection()])
	.then(() => runServer())
	.catch((error) => {
		console.log(`Erro ao inicializar o servidor, message:${error}`);
	});

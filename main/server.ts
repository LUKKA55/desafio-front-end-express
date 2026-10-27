import { createServer } from "./config/express.config.js";

const app = createServer()

const port = process.env.PORT ?? 5000;

app.listen(port, () => console.log("Servidor rodando"));
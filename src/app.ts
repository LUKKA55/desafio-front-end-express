import express, {type Response, type Request} from 'express';

const app = express();

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(5000);

console.log("Servidor rodando")
import express, { Express, Response, Request } from "express";
import Joi from "joi";

const app: Express = express();
const port: number = 3000;
app.use(express.json());

interface todo {
  id: number;
  userId: number;
  todo: string;
  completed: boolean;
}

const todos: Array<todo> = [];

app.get("/todos", (req: Request, res: Response) => {
  res.status(200).json(todos);
});

app.post("/todos", (req: Request, res: Response) => {
  todos.push(req.body);
  res.end();
});

app.put("/", (req: Request, res: Response) => {
  res.end();
});

app.delete("/", (req: Request, res: Response) => {
  res.end();
});

app.listen(port, () =>
  console.log(`il server è in ascolto su http://localhost:${port}!`)
);

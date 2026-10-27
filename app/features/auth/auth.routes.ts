import { Router, type Request, type Response } from "express";

const authRoutes = Router()

authRoutes.get("/login", (req: Request, res: Response) => res.send('Hello World!'))

export default authRoutes
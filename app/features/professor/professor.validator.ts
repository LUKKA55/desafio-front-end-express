import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const professorSchema = z.object({
    nome: z.string()
        .nonempty("Nome é obrigatório.")
        .max(100, "Nome precisa ter no máximo 100 caracteres."),
    email: z.email("E-mail inválido.")
        .max(100, "E-mail precisa ter no máximo 100 caracteres"),
});

export const validateProfessor = (req: Request, res: Response, next: NextFunction) => {
    const validator = professorSchema.safeParse(req.body);

    if (validator.success)
        return next();

    const erros = validator.error.flatten().fieldErrors

    return res.status(400).json({ errorMessages: Object.values(erros).flat() });
};
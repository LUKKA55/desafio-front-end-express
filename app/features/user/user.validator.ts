import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const createUserSchema = z.object({
    userName: z.string()
        .nonempty("Nome é obrigatório.")
        .min(3, "Nome precisa ter minímo 3 caracteres.")
        .max(100, "Nome precisa ter máximo 100 caracteres."),
    password: z.string()
        .nonempty("Senha é obrigatória.")
        .min(6, "Senha precisa ter minímo 6 caracteres.")
        .max(20, "Senha precisa ter máximo 20 caracteres."),
});

export const validateBody = (req: Request, res: Response, next: NextFunction) => {
    try {
        const validator = createUserSchema.safeParse(req.body);

        if(validator.success)
            return next();

        const erros = validator?.error?.flatten()?.fieldErrors ?? []

        return res.status(400).json({ errorMessages: Object.values(erros).flat() });
    } catch (error) {
        return res.status(400).json({ error: error });
    }
};
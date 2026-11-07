import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const disciplinaSchema = z.object({
    codigo: z.string()
        .nonempty("Código é obrigatório.")
        .max(10, "Código precisa ter no máximo 10 caracteres."),
    nome: z.string()
        .nonempty("Nome é obrigatório.")
        .max(100, "Nome precisa ter no máximo 100 caracteres."),
    cargaHoraria: z.number("Carga horária deve ser um número.")
        .int("Carga horária deve ser um número inteiro.")
        .positive("Carga horária deve ser maior que 0."),
});

export const validateDisciplina = (req: Request, res: Response, next: NextFunction) => {
    const validator = disciplinaSchema.safeParse(req.body);

    if (validator.success)
        return next();

    const erros = validator.error.flatten().fieldErrors

    return res.status(400).json({ errorMessages: Object.values(erros).flat() });
};
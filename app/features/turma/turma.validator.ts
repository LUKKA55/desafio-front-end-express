import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const turmaSchema = z.object({
    disciplinaId: z.string()
        .nonempty("Disciplina é obrigatória."),
    professorId: z.string()
        .nonempty("Professor é obrigatório."),
    diaSemana: z.number("Dia da semana deve ser um número.")
        .int("Dia da semana inválido.")
        .min(2, "Dia da semana deve ser entre 2 (segunda) e 7 (sábado).")
        .max(7, "Dia da semana deve ser entre 2 (segunda) e 7 (sábado)."),
    turno: z.number("Turno deve ser um número.")
        .int("Turno inválido.")
        .min(1, "Turno deve ser 1 (manhã), 2 (tarde) ou 3 (noite).")
        .max(3, "Turno deve ser 1 (manhã), 2 (tarde) ou 3 (noite)."),
    vagas: z.number("Vagas deve ser um número.")
        .int("Vagas deve ser um número inteiro.")
        .positive("A turma deve ter pelo menos 1 vaga."),
    semestre: z.string()
        .regex(/^\d{4}\/[12]$/, "Semestre deve estar no formato 2026/2."),
});

export const validateTurma = (req: Request, res: Response, next: NextFunction) => {
    const validator = turmaSchema.safeParse(req.body);

    if (validator.success)
        return next();

    const erros = validator.error.flatten().fieldErrors

    return res.status(400).json({ errorMessages: Object.values(erros).flat() });
};
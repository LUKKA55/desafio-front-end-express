import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const camposAluno = {
    nome: z.string()
        .trim()
        .nonempty("Nome é obrigatório.")
        .max(100, "Nome precisa ter no máximo 100 caracteres.")
        .regex(/[a-zA-ZÀ-ÿ]/, "Nome precisa ter letras."),
    email: z.email("E-mail inválido.")
        .max(100, "E-mail precisa ter no máximo 100 caracteres."),
    matricula: z.string()
        .trim()
        .nonempty("Matrícula é obrigatória.")
        .max(10, "Matrícula precisa ter no máximo 10 caracteres."),
}

const senha = z.string()
    .min(6, "Senha precisa ter no mínimo 6 caracteres.")
    .max(20, "Senha precisa ter no máximo 20 caracteres.")

const criarAlunoSchema = z.object({
    ...camposAluno,
    senha,
});

const atualizarAlunoSchema = z.object({
    ...camposAluno,
    senha: senha.optional().or(z.literal("")),
});

const validar = (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    const validator = schema.safeParse(req.body);

    if (validator.success) {
        req.body = validator.data
        return next();
    }

    const erros = z.flattenError(validator.error).fieldErrors as Record<string, string[]>

    return res.status(400).json({ errorMessages: Object.values(erros).flat() });
};

export const validateCriarAluno = validar(criarAlunoSchema)
export const validateAtualizarAluno = validar(atualizarAlunoSchema)

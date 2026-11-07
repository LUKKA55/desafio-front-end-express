import type { Response } from "express"

export class ErroApi extends Error {
    constructor(public status: number, mensagem: string) {
        super(mensagem)
    }
}

export const responderErro = (res: Response, erro: unknown) => {
    if (erro instanceof ErroApi)
        return res.status(erro.status).json({ errorMessages: [erro.message] })

    console.log(erro)
    return res.status(500).json({ errorMessages: ["Erro interno do servidor."] })
}
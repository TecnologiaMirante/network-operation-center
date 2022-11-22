import { Request, Response } from "express";
import { PrismaOpcoesRepository } from "../../repositories/prisma/opcoes/prisma-opcoes-repository";
import { DeleteOpcaoService } from "../../services/opcoes/DeleteOpcaoService";

class DeleteOpcaoController {
  async handle(req:Request, res:Response) {

    // Dados do parãmetro da requisição
    const { id } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaOpcoesRepository = new PrismaOpcoesRepository();

    // Service da Secretaria
    const deleteOpcaoService = new DeleteOpcaoService(prismaOpcoesRepository);

    // Executando o service
    const resposta = await deleteOpcaoService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(resposta instanceof Error) {
      return res.status(400).send(resposta.message);
    }

    // Retornando Secretaria encontrada para o usuário
    return res.status(204).send()
  }
}

export { DeleteOpcaoController };
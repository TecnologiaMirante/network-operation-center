import { Request, Response } from "express";
import { PrismaAnotacoesRepository } from "../../repositories/prisma/anotacoes/prisma-anotacoes-repository";
import { DeleteAnotacaoService } from "../../services/anotacoes/DeleteAnotacaoService";

class DeleteAnotacaoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetros da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaAnotacoesRepository = new PrismaAnotacoesRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const deleteAnotacaoService = new DeleteAnotacaoService(prismaAnotacoesRepository);

    // Executando o service
    const anotacao = await deleteAnotacaoService.execute({
      id
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(anotacao instanceof Error) {
      return res.status(400).send(anotacao.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(204).end();
  }
}

export { DeleteAnotacaoController };
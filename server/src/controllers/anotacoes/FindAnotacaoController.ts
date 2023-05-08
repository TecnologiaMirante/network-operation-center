import { Request, Response } from "express";
import { PrismaAnotacoesRepository } from "../../repositories/prisma/anotacoes/prisma-anotacoes-repository";
import { FindAnotacaoService } from "../../services/anotacoes/FindAnotacaoService";

class FindAnotacaoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetros da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaAnotacoesRepository = new PrismaAnotacoesRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const findAnotacaoService = new FindAnotacaoService(prismaAnotacoesRepository);

    // Executando o service
    const anotacao = await findAnotacaoService.execute({
      id
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(anotacao instanceof Error) {
      return res.status(400).send(anotacao.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        anotacao,
      }
    );
  }
}

export { FindAnotacaoController };
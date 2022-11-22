import { Request, Response } from "express";
import { PrismaOpcoesRepository } from "../../repositories/prisma/opcoes/prisma-opcoes-repository";
import { FindOpcaoService } from "../../services/opcoes/FindOpcaoService";

class FindOpcaoController {
  async handle(req:Request, res:Response) {

    // Dados do parãmetro da requisição
    const { id } = req.params;

    // Repositório do modelo secretaria do Prisma
    const prismaOpcoesRepository = new PrismaOpcoesRepository();

    // Service da Secretaria
    const findOpcaoService = new FindOpcaoService(prismaOpcoesRepository);

    // Executando o service
    const opcao = await findOpcaoService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(opcao instanceof Error) {
      return res.status(400).send(opcao.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        opcao,
      }
    );
  }
}

export { FindOpcaoController };
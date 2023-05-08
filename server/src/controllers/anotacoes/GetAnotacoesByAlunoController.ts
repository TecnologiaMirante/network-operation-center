import { Request, Response } from "express";
import { PrismaAnotacoesRepository } from "../../repositories/prisma/anotacoes/prisma-anotacoes-repository";
import { GetAnotacoesByAlunoService } from "../../services/anotacoes/GetAnotacoesByAlunoService";

class GetAnotacoesByAlunoController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetros da requisição
    const { id_aluno } = req.params;

    // Repositório do modelo do prisma
    const prismaAnotacoesRepository = new PrismaAnotacoesRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const getAnotacoesByAlunoService = new GetAnotacoesByAlunoService(prismaAnotacoesRepository);

    // Executando o service
    const anotacoes = await getAnotacoesByAlunoService.execute({
      id_aluno
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(anotacoes instanceof Error) {
      return res.status(400).send(anotacoes.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        anotacoes,
      }
    );
  }
}

export { GetAnotacoesByAlunoController };
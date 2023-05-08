import { Request, Response } from "express";
import { PrismaOpcoesRepository } from "../../repositories/prisma/opcoes/prisma-opcoes-repository";
import { PrismaQuestoesRepository } from "../../repositories/prisma/questoes/prisma-questoes-repository";
import { CreateOpcaoService } from "../../services/opcoes/CreateOpcaoService";

class CreateOpcaoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { description, is_correct, id_questao } = req.body;

    // Repositório do modelo secretaria do Prisma
    const prismaOpcoesRepository = new PrismaOpcoesRepository();
    const prismaQuestoesRepository = new PrismaQuestoesRepository();

    // Service da Secretaria
    const createOpcaoService = new CreateOpcaoService(prismaOpcoesRepository, prismaQuestoesRepository);

    // Executando o service
    const questao = await createOpcaoService.execute({
      description,
      is_correct, 
      id_questao
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(questao instanceof Error) {
      return res.status(400).send(questao.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateOpcaoController };
import { Request, Response } from "express";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { CreateAtividadeService } from "../../services/atividades/CreateAtividadeService";

class CreateAtividadeController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { title, id_serie, id_disciplina } = req.body;

    // Repositório do modelo do prisma
    const prismaAtividadesRepository = new PrismaAtividadesRepository();
    const prismaConteudosRepository = new PrismaConteudosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const createAtividadeService = new CreateAtividadeService(prismaAtividadesRepository, prismaConteudosRepository);

    const thumb = "https://storage.googleapis.com/mrt-mais-educacao-dev-midias/Atividade.png";

    // Executando o service
    const atividade = await createAtividadeService.execute({
      title,
      thumb,
      id_serie,
      id_disciplina
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(atividade instanceof Error) {
      return res.status(400).send(atividade.message);
    }

    // Criando a questão -------------------------------------------------------------------
    const { questions } = req.body;

    const question_type = "objetiva";


    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateAtividadeController };
import { Request, Response } from "express";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { UpdateAtividadeService } from "../../services/atividades/UpdateAtividadeService";

class UpdateAtividadeController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { title, thumb} = req.body;

    // Repositório do modelo do prisma
    const prismaAtividadesRepository = new PrismaAtividadesRepository();
    const prismaConteudosRepository = new PrismaConteudosRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const updateAtividadeService = new UpdateAtividadeService(prismaAtividadesRepository, prismaConteudosRepository);

    // Executando o service
    const atividade = await updateAtividadeService.execute({
      id,
      title,
      thumb
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(atividade instanceof Error) {
      return res.status(400).send(atividade.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateAtividadeController };
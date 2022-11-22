import { Request, Response } from "express";
import { PrismaEscolaUsersRepository } from "../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { PrismaResponsaveisRepository } from "../../repositories/prisma/responsaveis/prisma-responsaveis-repository";
import { UpdateResponsavelService } from "../../services/responsaveis/UpdateResponsavelService";

class UpdateResponsavelController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { name, email, cpf, phone } = req.body;

    // Repositório do modelo do Prisma
    const prismaResponsaveisRepository = new PrismaResponsaveisRepository();
    const prismaEscolasUsersRepository = new PrismaEscolaUsersRepository();

    // Service
    const updateResponsavelService = new UpdateResponsavelService(prismaEscolasUsersRepository, prismaResponsaveisRepository);

    // Executando o service
    const resp = await updateResponsavelService.execute({
      id,
      name, 
      email, 
      cpf, 
      phone
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(resp instanceof Error) {
      return res.status(400).send(resp.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Responsável atualizado com sucesso!",
      }
    );
  }
}

export { UpdateResponsavelController };
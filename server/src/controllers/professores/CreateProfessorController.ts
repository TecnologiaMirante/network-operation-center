import { Request, Response } from "express";
import { PrismaEscolaUsersRepository } from "../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { CreateProfessorService } from "../../services/professores/CreateProfessorService";

class CreateProfessorController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { education, experience, description, id_escola_user  } = req.body;

    // Repositório do modelo do prisma
    const prismaProfessoresRepository = new PrismaProfessoresRepository();
    const prismaEscolasUsersRepository = new PrismaEscolaUsersRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const createProfessorService = new CreateProfessorService(prismaProfessoresRepository, prismaEscolasUsersRepository);

    // Executando o service
    const escola = await createProfessorService.execute({
      education,
      experience,
      description,
      id_escola_user
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escola instanceof Error) {
      return res.status(400).send(escola.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateProfessorController };
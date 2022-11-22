import { Request, Response } from "express";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { UpdateProfessorService } from "../../services/professores/UpdateProfessorService";

class UpdateProfessorController {
  async handle(req:Request, res:Response) {

    const { id } = req.params;

    // Dados do corpo da requisição
    const { education, experience, description, id_escola_user  } = req.body;

    // Repositório do modelo do prisma
    const prismaProfessoresRepository = new PrismaProfessoresRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const updateProfessorService = new UpdateProfessorService(prismaProfessoresRepository);

    // Executando o service
    const escola = await updateProfessorService.execute({
      id, 
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
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateProfessorController };
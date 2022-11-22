import { Request, Response} from "express";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { DeleteProfessorService } from "../../services/professores/DeleteProfessorService";

class DeleteProfessorController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo Professor do Prisma
    const prismaProfessoresRepository = new PrismaProfessoresRepository();
    
    // Service da Professor
    const deleteProfessorService = new DeleteProfessorService(prismaProfessoresRepository);

    // Executando o service
    const professor = await deleteProfessorService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(professor instanceof Error) {
      return res.status(400).send(professor.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteProfessorController };
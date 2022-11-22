import { Request, Response} from "express";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { FindProfessorService } from "../../services/professores/FindProfessorService";

class FindProfessorController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo Professor do Prisma
    const prismaProfessoresRepository = new PrismaProfessoresRepository();
    
    // Service da Professor
    const findProfessorService = new FindProfessorService(prismaProfessoresRepository);

    // Executando o service
    const professor = await findProfessorService.execute({id});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(professor instanceof Error) {
      return res.status(400).send(professor.message);
    }

    // Retornando Professor encontrada para o usuário
    return res.status(200).send(
      {
        professor
      }
    )
  }
}

export { FindProfessorController };
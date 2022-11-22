import { Request, Response} from "express";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { GetProfessoresService } from "../../services/professores/GetProfessoresService";

class GetProfessoresController {
  async handle(req:Request, res:Response) {
    
    // Repositório do modelo do Prisma
    const prismaProfessoresRepository = new PrismaProfessoresRepository();
    
    // Service
    const getProfessoresService = new GetProfessoresService(prismaProfessoresRepository);

    // Executando o service
    const professores = await getProfessoresService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(professores instanceof Error) {
      return res.status(400).send(professores.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        professores
      }
    )

  };
}

export { GetProfessoresController };
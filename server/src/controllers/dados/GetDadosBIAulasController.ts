import { Request, Response} from "express";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { PrismaDadosBIAulasRepository } from "../../repositories/prisma/dados/prisma-dados-BI-AULAS-repository";
import { GetDadosBIAulasService } from "../../services/dados/GetDadosBIAulasService";

class GetDadosBIAulasController {
  async handle(req:Request, res:Response) {
    
    const { id_professor } = req.params;

    // Repositório do modelo do Prisma
    const prismaProfessoresRepository = new PrismaProfessoresRepository();
    const prismaDadosBIAulasRepository = new PrismaDadosBIAulasRepository();
    
    // Service
    const getDadosBIAulasService = new GetDadosBIAulasService(prismaProfessoresRepository, prismaDadosBIAulasRepository);

    // Executando o service
    const dados = await getDadosBIAulasService.execute({ id_professor });

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(dados instanceof Error) {
      return res.status(400).send(dados.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(dados)

  };
}

export { GetDadosBIAulasController };
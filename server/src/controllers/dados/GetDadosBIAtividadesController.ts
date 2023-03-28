import { Request, Response} from "express";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { PrismaDadosBIAtividadesRepository } from "../../repositories/prisma/dados/prisma-dados-BI-ATIVIDADES-repository";
import { GetDadosBIAtividadesService } from "../../services/dados/GetDadosBIAtividadesService";

class GetDadosBIAtividadesController {
  async handle(req:Request, res:Response) {
    
    const { id_professor } = req.params;

    // Repositório do modelo do Prisma
    const prismaProfessoresRepository = new PrismaProfessoresRepository();
    const prismaDadosBIAtividadesRepository = new PrismaDadosBIAtividadesRepository();
    
    // Service
    const getDadosBIAtividadesService = new GetDadosBIAtividadesService(prismaProfessoresRepository, prismaDadosBIAtividadesRepository);

    // Executando o service
    const dados = await getDadosBIAtividadesService.execute({ id_professor });

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(dados instanceof Error) {
      return res.status(400).send(dados.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(dados)

  };
}

export { GetDadosBIAtividadesController };
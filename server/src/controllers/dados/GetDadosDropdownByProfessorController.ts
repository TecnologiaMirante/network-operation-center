import { Request, Response} from "express";
import { PrismaProfessoresRepository } from "../../repositories/prisma/professores/prisma-professores-repository";
import { PrismaDadosDropdownRepository } from "../../repositories/prisma/dados/prisma-dados-dropdown-repository";
import { GetDadosDropdownByProfessorService } from "../../services/dados/GetDadosDropdownByProfessorService";

class GetDadosDropdownByProfessorController {
  async handle(req:Request, res:Response) {
    
    const { id_professor } = req.params;

    // Repositório do modelo do Prisma
    const prismaProfessoresRepository = new PrismaProfessoresRepository();
    const prismaDadosDropdownRepository = new PrismaDadosDropdownRepository();
    
    // Service
    const getDadosDropdownByProfessorService = new GetDadosDropdownByProfessorService(prismaProfessoresRepository, prismaDadosDropdownRepository);

    // Executando o service
    const dados = await getDadosDropdownByProfessorService.execute({ id_professor });

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(dados instanceof Error) {
      return res.status(400).send(dados.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(dados)

  };
}

export { GetDadosDropdownByProfessorController };
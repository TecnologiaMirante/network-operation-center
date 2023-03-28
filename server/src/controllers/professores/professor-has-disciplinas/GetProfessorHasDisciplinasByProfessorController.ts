import { Request, Response } from "express";
import { PrismaProfessorHasDisciplinasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplinas-repository";

import { GetProfessorHasDisciplinasByProfessorService } from "../../../services/professores/professor-has-disciplinas/GetProfessorHasDisciplinasByProfessorService";


class GetProfessorHasDisciplinasByProfessorController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaProfessorHasDisciplinasRepository = new PrismaProfessorHasDisciplinasRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getProfessorHasDisciplinasByProfessorService = new GetProfessorHasDisciplinasByProfessorService(prismaProfessorHasDisciplinasRepository);

    // Executando o service
    const disciplinas = await getProfessorHasDisciplinasByProfessorService.execute({
      id_professor:id, 
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(disciplinas instanceof Error) {
      return res.status(400).send(disciplinas.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        disciplinas,
      }
    );
  }
}

export { GetProfessorHasDisciplinasByProfessorController };
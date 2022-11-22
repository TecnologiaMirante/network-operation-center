import { Request, Response } from "express";
import { PrismaProfessorHasDisciplinasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplinas-repository";

import { GetProfessorHasDisciplinasService } from "../../../services/professores/professor-has-disciplinas/GetProfessorHasDisciplinasService";

class GetProfessorHasDisciplinasController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do prisma
    const prismaProfessorHasDisciplinasRepository = new PrismaProfessorHasDisciplinasRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getProfessorHasDisciplinaService = new GetProfessorHasDisciplinasService(prismaProfessorHasDisciplinasRepository);

    // Executando o service
    const registros = await getProfessorHasDisciplinaService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(registros instanceof Error) {
      return res.status(400).send(registros.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send({
      registros
    });
  }
}

export { GetProfessorHasDisciplinasController };
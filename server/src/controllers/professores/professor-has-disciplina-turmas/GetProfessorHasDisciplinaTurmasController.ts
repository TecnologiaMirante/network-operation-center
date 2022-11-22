import { Request, Response } from "express";
import { PrismaProfessorHasDisciplinaTurmasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplina-turmas-repository";

import { GetProfessorHasDisciplinaTurmasService } from "../../../services/professores/professor-has-disciplina-turmas/GetProfessorHasDisciplinaTurmasService";


class GetProfessorHasDisciplinaTurmasController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do prisma
    const prismaProfessorHasDisciplinaTurmasRepository = new PrismaProfessorHasDisciplinaTurmasRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const getProfessorHasDisciplinaTurmaService = new GetProfessorHasDisciplinaTurmasService(prismaProfessorHasDisciplinaTurmasRepository);

    // Executando o service
    const registros = await getProfessorHasDisciplinaTurmaService.execute()

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

export { GetProfessorHasDisciplinaTurmasController };
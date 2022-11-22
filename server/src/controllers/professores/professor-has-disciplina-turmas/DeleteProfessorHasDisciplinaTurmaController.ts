import { Request, Response } from "express";
import { PrismaProfessorHasDisciplinaTurmasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplina-turmas-repository";

import { DeleteProfessorHasDisciplinaTurmaService } from "../../../services/professores/professor-has-disciplina-turmas/DeleteProfessorHasDisciplinaTurmaService";


class DeleteProfessorHasDisciplinaTurmaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaProfessorHasDisciplinaTurmasRepository = new PrismaProfessorHasDisciplinaTurmasRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const deleteProfessorHasDisciplinaTurmaService = new DeleteProfessorHasDisciplinaTurmaService(prismaProfessorHasDisciplinaTurmasRepository);

    // Executando o service
    const registro = await deleteProfessorHasDisciplinaTurmaService.execute({
      id, 
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(registro instanceof Error) {
      return res.status(400).send(registro.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(204).end();
  }
}

export { DeleteProfessorHasDisciplinaTurmaController };
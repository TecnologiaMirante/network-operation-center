import { Request, Response } from "express";
import { PrismaProfessorHasDisciplinaTurmasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplina-turmas-repository";
import { PrismaProfessorHasDisciplinasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplinas-repository";
import { PrismaTurmasRepository } from "../../../repositories/prisma/turmas/prisma-turmas-repository";

import { UpdateProfessorHasDisciplinaTurmaService } from "../../../services/professores/professor-has-disciplina-turmas/UpdateProfessorHasDisciplinaTurmaService";


class UpdateProfessorHasDisciplinaTurmaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { id_professor_has_disciplinas, id_turma } = req.body;

    // Repositório do modelo do prisma
    const prismaProfessorHasDisciplinaTurmasRepository = new PrismaProfessorHasDisciplinaTurmasRepository();
    const prismaProfessorHasDisciplinasRepository = new PrismaProfessorHasDisciplinasRepository();
    const prismaTurmasRepository = new PrismaTurmasRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const updateProfessorHasDisciplinaTurmaService = new UpdateProfessorHasDisciplinaTurmaService(prismaProfessorHasDisciplinaTurmasRepository, prismaProfessorHasDisciplinasRepository, prismaTurmasRepository);

    // Executando o service
    const registro = await updateProfessorHasDisciplinaTurmaService.execute({
      id, 
      id_professor_has_disciplinas,
      id_turma
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(registro instanceof Error) {
      return res.status(400).send(registro.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateProfessorHasDisciplinaTurmaController };
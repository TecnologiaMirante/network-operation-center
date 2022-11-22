import { Request, Response } from "express";
import { PrismaProfessorHasDisciplinaTurmasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplina-turmas-repository";
import { PrismaProfessorHasDisciplinasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplinas-repository";
import { PrismaTurmasRepository } from "../../../repositories/prisma/turmas/prisma-turmas-repository";

import { CreateProfessorHasDisciplinaTurmaService } from "../../../services/professores/professor-has-disciplina-turmas/CreateProfessorHasDisciplinaTurmaService";

class CreateProfessorHasDisciplinaTurmaController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_professor_has_disciplinas, id_turma } = req.body;

    // Repositório do modelo do prisma
    const prismaProfessorHasDisciplinaTurmasRepository = new PrismaProfessorHasDisciplinaTurmasRepository();
    const prismaProfessorHasDisciplinasRepository = new PrismaProfessorHasDisciplinasRepository();
    const prismaTurmasRepository = new PrismaTurmasRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const createProfessorHasDisciplinaTurmaService = new CreateProfessorHasDisciplinaTurmaService(prismaProfessorHasDisciplinaTurmasRepository, prismaProfessorHasDisciplinasRepository, prismaTurmasRepository);

    // Executando o service
    const registro = await createProfessorHasDisciplinaTurmaService.execute({
      id_professor_has_disciplinas,
      id_turma,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(registro instanceof Error) {
      return res.status(400).send(registro.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateProfessorHasDisciplinaTurmaController };
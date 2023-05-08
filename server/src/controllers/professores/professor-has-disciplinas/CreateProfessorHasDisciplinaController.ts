import { Request, Response } from "express";
import { PrismaProfessorHasDisciplinasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplinas-repository";
import { PrismaProfessoresRepository } from "../../../repositories/prisma/professores/prisma-professores-repository";
import { PrismaDisciplinasRepository } from "../../../repositories/prisma/disciplinas/prisma-disciplinas-repository";

import { CreateProfessorHasDisciplinaService } from "../../../services/professores/professor-has-disciplinas/CreateProfessorHasDisciplinaService";


class CreateProfessorHasDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_professor, id_disciplina } = req.body;

    // Repositório do modelo do prisma
    const prismaProfessorHasDisciplinasRepository = new PrismaProfessorHasDisciplinasRepository();
    const prismaProfessoresRepository = new PrismaProfessoresRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
    

    // Service ----------------------------------------------------------------------------------------------------------------
    const createProfessorHasDisciplinaService = new CreateProfessorHasDisciplinaService(prismaProfessorHasDisciplinasRepository, prismaProfessoresRepository, prismaDisciplinasRepository);

    // Executando o service
    const registro = await createProfessorHasDisciplinaService.execute({
      id_professor,
      id_disciplina,
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

export { CreateProfessorHasDisciplinaController };
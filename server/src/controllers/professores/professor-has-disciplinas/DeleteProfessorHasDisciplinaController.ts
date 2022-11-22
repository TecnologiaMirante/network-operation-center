import { Request, Response } from "express";
import { PrismaProfessorHasDisciplinasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplinas-repository";

import { DeleteProfessorHasDisciplinaService } from "../../../services/professores/professor-has-disciplinas/DeleteProfessorHasDisciplinaService";


class DeleteProfessorHasDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do prisma
    const prismaProfessorHasDisciplinasRepository = new PrismaProfessorHasDisciplinasRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const deleteProfessorHasDisciplinaService = new DeleteProfessorHasDisciplinaService(prismaProfessorHasDisciplinasRepository);

    // Executando o service
    const registro = await deleteProfessorHasDisciplinaService.execute({
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

export { DeleteProfessorHasDisciplinaController };
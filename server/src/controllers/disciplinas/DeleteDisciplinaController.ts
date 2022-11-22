import { Request, Response } from "express";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { DeleteDisciplinaService } from "../../services/disciplinas/DeleteDisciplinaService";

class DeleteDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

    // Service
    const deleteDisciplinaService = new DeleteDisciplinaService(prismaDisciplinasRepository);

    // Executando o service
    const disciplina = await deleteDisciplinaService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(disciplina instanceof Error) {
      return res.status(400).send(disciplina.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteDisciplinaController };
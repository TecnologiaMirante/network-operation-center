import { Request, Response } from "express";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { FindDisciplinaService } from "../../services/disciplinas/FindDisciplinaService";

class FindDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

    // Service
    const findDisciplinaService = new FindDisciplinaService(prismaDisciplinasRepository);

    // Executando o service
    const disciplina = await findDisciplinaService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(disciplina instanceof Error) {
      return res.status(400).send(disciplina.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        disciplina,
      }
    );
  }
}

export { FindDisciplinaController };
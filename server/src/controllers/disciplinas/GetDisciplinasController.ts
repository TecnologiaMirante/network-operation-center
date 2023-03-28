import { Request, Response } from "express";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { GetDisciplinasService } from "../../services/disciplinas/GetDisciplinasService";

class GetDisciplinasController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do Prisma
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

    // Service
    const getDisciplinasService = new GetDisciplinasService(prismaDisciplinasRepository);

    // Executando o service
    const disciplinas = await getDisciplinasService.execute()

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

export { GetDisciplinasController };
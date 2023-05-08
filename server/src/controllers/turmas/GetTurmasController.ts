import { Request, Response } from "express";
import { PrismaTurmasRepository } from "../../repositories/prisma/turmas/prisma-turmas-repository";
import { GetTurmasService } from "../../services/turmas/GetTurmasService";

class GetTurmasController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaTurmasRepository = new PrismaTurmasRepository();

    // Service
    const getTurmasService = new GetTurmasService(prismaTurmasRepository);

    // Executando o service
    const turmas = await getTurmasService.execute()

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(turmas instanceof Error) {
      return res.status(400).send(turmas.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        turmas,
      }
    );
    
  }
}

export { GetTurmasController };
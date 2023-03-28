import { Request, Response } from "express";
import { PrismaTurmasRepository } from "../../repositories/prisma/turmas/prisma-turmas-repository";
import { FindTurmaService } from "../../services/turmas/FindTurmaService";

class FindTurmaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaTurmasRepository = new PrismaTurmasRepository();

    // Service
    const findTurmaService = new FindTurmaService(prismaTurmasRepository);

    // Executando o service
    const turma = await findTurmaService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(turma instanceof Error) {
      return res.status(400).send(turma.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        turma,
      }
    );
    
  }
}

export { FindTurmaController };
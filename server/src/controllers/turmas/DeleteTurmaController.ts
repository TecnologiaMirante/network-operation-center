import { Request, Response } from "express";
import { PrismaTurmasRepository } from "../../repositories/prisma/turmas/prisma-turmas-repository";
import { DeleteTurmaService } from "../../services/turmas/DeleteTurmaService";

class DeleteTurmaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Repositório do modelo do Prisma
    const prismaTurmasRepository = new PrismaTurmasRepository();

    // Service
    const deleteTurmaService = new DeleteTurmaService(prismaTurmasRepository);

    // Executando o service
    const turma = await deleteTurmaService.execute({
      id,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(turma instanceof Error) {
      return res.status(400).send(turma.message);
    }

    // Retornando status para o usuário
    return res.status(204).end();
  }
}

export { DeleteTurmaController };
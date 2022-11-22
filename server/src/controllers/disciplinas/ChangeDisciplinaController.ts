import { Request, Response } from "express";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { ChangeDisciplinaService } from "../../services/disciplinas/ChangeDisciplinaService";

class ChangeDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { status } = req.body;

    // Repositório do modelo do Prisma
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();

    // Service
    const changeDisciplinaService = new ChangeDisciplinaService(prismaDisciplinasRepository);

    // Executando o service
    const disciplina = await changeDisciplinaService.execute({
      id,
      status
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(disciplina instanceof Error) {
      return res.status(400).send(disciplina.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { ChangeDisciplinaController };
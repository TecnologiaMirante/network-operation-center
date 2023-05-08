import { Request, Response } from "express";
import { PrismaBimestresRepository } from "../../repositories/prisma/bimestres/prisma-bimestres-repository";
import { CreateBimestreService } from "../../services/bimestres/CreateBimestreService";

class CreateBimestreController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { number, start, end } = req.body;

    const start_formatada = new Date(start)
    const end_formatada = new Date(end)

    // 2022-01-01T23:28:56.782Z
    // 1º bimestre: JAN - MAR
    // 2º bimestre: ABR - JUN 
    // 3º bimestre: JUL - SET
    // 4º bimestre: OUT - DEZ

    // Repositório do modelo do prisma
    const prismaBimestresRepository = new PrismaBimestresRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const createBimestreService = new CreateBimestreService(prismaBimestresRepository);

    // Executando o service
    const bimestre = await createBimestreService.execute({
      number,
      start: start_formatada,
      end: end_formatada,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(bimestre instanceof Error) {
      return res.status(400).send(bimestre.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Bimestre criado com sucesso!",
      }
    );
  }
}

export { CreateBimestreController };
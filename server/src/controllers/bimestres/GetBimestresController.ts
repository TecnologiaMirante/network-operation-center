import { Request, Response } from "express";
import { PrismaBimestresRepository } from "../../repositories/prisma/bimestres/prisma-bimestres-repository";
import { GetBimestresService } from "../../services/bimestres/GetBimestresService";

class GetBimestresController {
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
    const getBimestreService = new GetBimestresService(prismaBimestresRepository);

    // Executando o service
    const bimestres = await getBimestreService.execute();

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(bimestres instanceof Error) {
      return res.status(400).send(bimestres.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        bimestres,
      }
    );
  }
}

export { GetBimestresController };
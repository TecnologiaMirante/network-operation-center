import { Request, Response } from "express";
import { PrismaProfessorHasDisciplinaTurmasRepository } from "../../../repositories/prisma/professores/prisma-professor-has-disciplina-turmas-repository";
import { GetSeriesProfessorHasDisciplinaTurmasService } from "../../../services/professores/professor-has-disciplina-turmas/GetSeriesProfessorHasDisciplinaTurmasService";


class GetSeriesProfessorHasDisciplinaTurmaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id_professor } = req.params;

    // Repositório do modelo do prisma
    const prismaProfessorHasDisciplinaTurmasRepository = new PrismaProfessorHasDisciplinaTurmasRepository();
    

    // Service ----------------------------------------------------------------------------------------------------------------
    const getSeriesProfessorHasDisciplinaTurmasService = new GetSeriesProfessorHasDisciplinaTurmasService(prismaProfessorHasDisciplinaTurmasRepository);

    // Executando o service
    const series = await getSeriesProfessorHasDisciplinaTurmasService.execute({
      id_professor, 
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(series instanceof Error) {
      return res.status(400).send(series.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        series,
      }
    );
  }
}

export { GetSeriesProfessorHasDisciplinaTurmaController };
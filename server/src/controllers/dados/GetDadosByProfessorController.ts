import { Request, Response} from "express";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { PrismaTurmasRepository } from "../../repositories/prisma/turmas/prisma-turmas-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaDadosRepository } from "../../repositories/prisma/dados/prisma-dados-repository";
import { GetDadosByProfessorService } from "../../services/dados/GetDadosByProfessorService";

class GetDadosByProfessorController {
  async handle(req:Request, res:Response) {
    
    const { id_disciplina, id_turma, id_aluno } = req.params;

    // Repositório do modelo do Prisma
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
    const prismaTurmasRepository = new PrismaTurmasRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaDadosRepository = new PrismaDadosRepository();
    
    // Service
    const getDadosByProfessorService = new GetDadosByProfessorService(prismaDisciplinasRepository, prismaTurmasRepository, prismaAlunosRepository, prismaDadosRepository);

    // Executando o service
    const dados = await getDadosByProfessorService.execute({ id_disciplina, id_turma, id_aluno });

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(dados instanceof Error) {
      return res.status(400).send(dados.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(dados)

  };
}

export { GetDadosByProfessorController };
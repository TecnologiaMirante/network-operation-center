import { Request, Response } from "express";
import { PrismaProgressosRepository } from "../../repositories/prisma/progressos/prisma-progressos-repository";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaAulasRepository } from "../../repositories/prisma/aulas/prisma-aulas-repository";
import { PrismaBimestresRepository } from "../../repositories/prisma/bimestres/prisma-bimestres-repository";
import { CreateProgressoService } from "../../services/progressos/CreateProgressoService";
import { UpdateProgressoService } from "../../services/progressos/UpdateProgressoService";
import { FindProgressoByDataService } from "../../services/progressos/FindProgressoByDataService";

class CreateProgressoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_aluno, id_aula, progress, id_bimestre } = req.body;

    // Repositório do modelo do prisma
    const prismaProgressosRepository = new PrismaProgressosRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaAulasRepository = new PrismaAulasRepository();
    const prismaBimestresRepository = new PrismaBimestresRepository();
    

    // Service ----------------------------------------------------------------------------------------------------------------
    const createProgressoService = new CreateProgressoService(prismaProgressosRepository, prismaAlunosRepository, prismaAulasRepository, prismaBimestresRepository);
    const updateProgressoService = new UpdateProgressoService(prismaProgressosRepository, prismaAlunosRepository, prismaAulasRepository, prismaBimestresRepository);
    const findProgressoByDataService = new FindProgressoByDataService(prismaProgressosRepository, prismaAlunosRepository, prismaAulasRepository);

    // Verificando se já existe progresso
    const progresso = await findProgressoByDataService.execute({
      id_aluno, id_aula
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(progresso instanceof Error) {
      return res.status(400).send(progresso.message);
    }

    // Se existir, chama a função de atualizar
    if (progresso) {
      const atualizado = await updateProgressoService.execute({
        id: Object(progresso).id,
        id_aluno,
        id_aula,
        progress,
        id_bimestre
      })

      // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
      if(atualizado instanceof Error) {
        return res.status(400).send(atualizado.message);
      }
    } 

    // Se não, chama a de criar
    else {
      // Executando o service
      const progresso1 = await createProgressoService.execute({
        id_aluno,
        id_aula,
        progress,
        id_bimestre
      })

      // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
      if(progresso1 instanceof Error) {
        return res.status(400).send(progresso1.message);
      }
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateProgressoController };
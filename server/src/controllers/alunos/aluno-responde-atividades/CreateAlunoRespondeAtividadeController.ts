import { Request, Response } from "express";
import { PrismaAlunoRespondeAtividadesRepository } from "../../../repositories/prisma/alunos/prisma-aluno-responde-atividade";
import { PrismaAlunosRepository } from "../../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaAtividadesRepository } from "../../../repositories/prisma/atividades/prisma-atividades-repository";
import { PrismaBimestresRepository } from "../../../repositories/prisma/bimestres/prisma-bimestres-repository";
import { CreateAlunoRespondeAtividadeService } from "../../../services/alunos/aluno-responde-atividades/CreateAlunoRespondeAtividadeService";
import { io } from "../../../http";
import { Socket } from "socket.io";
import { CheckIfExistsResponda_X_AtividadesService } from "../../../services/conquistas/responda_x_atividades/CheckIfExistsResponda_X_AtividadesService";
import { PrismaConquistasRepository } from "../../../repositories/prisma/conquistas/prisma-conquistas-repository";
import { PrismaResponda_X_AtividadesRepository } from "../../../repositories/prisma/conquistas/responda_x_atividades/prisma-responda_x_atividades-repository";
import { GetAtividadeIdDisciplinaService } from "../../../services/atividades/GetAtividadeIdDisciplinaService";
import { UpdateProgressResponda_X_AtividadesService } from "../../../services/conquistas/responda_x_atividades/UpdateProgressResponda_x_atividadesService";

class CreateAlunoRespondeAtividadeController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { nota, time, id_aluno, id_atividade } = req.body;

    // Repositório do modelo do prisma
    const prismaAlunoRespondeAtividadesRepository = new PrismaAlunoRespondeAtividadesRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaAtividadesRepository = new PrismaAtividadesRepository();
    const prismaBimestresRepository = new PrismaBimestresRepository();

    // Service ----------------------------------------------------------------------------------------------------------------
    const createAlunoRespondeAtvService = new CreateAlunoRespondeAtividadeService(prismaAlunoRespondeAtividadesRepository, prismaAlunosRepository, prismaAtividadesRepository, prismaBimestresRepository);

    // Executando o service
    const alunoRespondeAtv = await createAlunoRespondeAtvService.execute({
      nota, 
      time,
      id_aluno, 
      id_atividade,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(alunoRespondeAtv instanceof Error) {
      return res.status(400).send(alunoRespondeAtv.message);
    }

    // Buscando o id da disciplina da atividade
    const getAtividadeIdDisciplinaService = new GetAtividadeIdDisciplinaService(prismaAtividadesRepository);
    const result = await getAtividadeIdDisciplinaService.execute({ id: id_atividade });

    if (result instanceof Error) {
      return res.status(400).send(result.message);
    }

    // TODO: Fazer o service pra atualizar o progresso na conquista, se existir
    const prismaResponda_X_AtividadesRepository = new PrismaResponda_X_AtividadesRepository();
    
    // * Verificar se a conquista existe
    const checkIfExists = new CheckIfExistsResponda_X_AtividadesService(prismaResponda_X_AtividadesRepository);
    const conquistas = await checkIfExists.execute({ id_disciplina: Object(result).id_disciplina });
    
    if (conquistas instanceof Error) {
      return res.status(400).send(conquistas.message);
    }

    // * Se existir, atualiza o progresso
    if (conquistas.length > 0) {

      // ? Chama o service de atualizar o progresso
      const updateConquistas = new UpdateProgressResponda_X_AtividadesService(prismaResponda_X_AtividadesRepository);
      const conquistasAtualizadas = await updateConquistas.execute({ id_aluno, conquistas })

    }

    // TODO: Chama o service pra ver se a conquista foi desbloqueada  (SOCKET chama no websocket.ts)

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
        data: {
          alunoRespondeAtv
        }
      }
    );
  }
}

export { CreateAlunoRespondeAtividadeController };
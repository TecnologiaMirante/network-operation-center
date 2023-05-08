import { Request, Response } from "express";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { PrismaSeriesRepository } from "../../repositories/prisma/series/prisma-series-repository";
import { CreateConteudoService } from "../../services/conteudos/CreateConteudoService";
import { PrismaAulasRepository } from "../../repositories/prisma/aulas/prisma-aulas-repository";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { PrismaBimestresRepository } from "../../repositories/prisma/bimestres/prisma-bimestres-repository";
import { CreateConteudoHasItensService } from "../../services/conteudos/conteudo-has-itens/CreateConteudoHasItensService";
import { PrismaConteudoHasItensRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-has-itens-repository";

class CreateConteudoController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, id_disciplina, id_serie, id_bimestre, created_by, array_conteudos, status } = req.body;

    // Repositório dos modelos do Prisma
    const prismaConteudosRepository = new PrismaConteudosRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
    const prismaSeriesRepository = new PrismaSeriesRepository();
    const prismaAulasRepository = new PrismaAulasRepository();
    const prismaAtividadesRepository = new PrismaAtividadesRepository();
    const prismaBimestresRepository = new PrismaBimestresRepository();
    const prismaConteudoHasItensRepository = new PrismaConteudoHasItensRepository();

    // Service do Conteúdo =================================================================================================
    const createConteudoService = new CreateConteudoService(prismaConteudosRepository, prismaDisciplinasRepository, prismaSeriesRepository, prismaBimestresRepository);

    // Executando o service
    const conteudo = await createConteudoService.execute({
      name,
      id_disciplina,
      id_serie,
      id_bimestre,
      created_by,
      status
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(conteudo instanceof Error) {
      return res.status(400).send(conteudo.message);
    }

    // A variável "array_conteudos" é opcional, portanto, o service seguinte só é chamado caso ela não seja nula
    if (array_conteudos && array_conteudos.length != 0) {
      
      // Service do Conteudo Has Itens =============================================================================================================================
      const createConteudoHasItensService = new CreateConteudoHasItensService(prismaConteudosRepository, prismaAulasRepository, prismaAtividadesRepository, prismaConteudoHasItensRepository);
      
      for (let item of array_conteudos) {

        if (item.type == "aula") {

          const result = await createConteudoHasItensService.execute({ 
            type: "aula",
            id_conteudo: Object(conteudo).id, 
            id_aula: item.id,
          })
      
          if (result instanceof Error) {
            return res.status(400).send(result.message);
          }
        }
  
        if (item.type == "atividade") {
          const result = await createConteudoHasItensService.execute({ 
            type: "atividade",
            id_conteudo: Object(conteudo).id, 
            id_atividade: item.id,
          })
      
          if (result instanceof Error) {
            return res.status(400).send(result.message);
          }
        }
      }
    }

    // Retornando mensagem de sucesso para o usuário ===================================================================================================================
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateConteudoController };

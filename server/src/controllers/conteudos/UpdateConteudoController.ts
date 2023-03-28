import { Request, Response } from "express";
import { PrismaConteudosRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-repository";
import { PrismaConteudoHasAulasRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-has-aulas-repository";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { UpdateConteudoService } from "../../services/conteudos/UpdateConteudoService";
import { PrismaAtividadesRepository } from "../../repositories/prisma/atividades/prisma-atividades-repository";
import { PrismaAulasRepository } from "../../repositories/prisma/aulas/prisma-aulas-repository";
import { PrismaBimestresRepository } from "../../repositories/prisma/bimestres/prisma-bimestres-repository";
import { PrismaConteudoHasAtividadesRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-has-atividades-repository";
import { PrismaConteudoHasItensRepository } from "../../repositories/prisma/conteudos/prisma-conteudo-has-itens-repository";
import { DeleteManyConteudoHasAulasService } from "../../services/conteudos/conteudo-has-aulas/DeleteManyConteudoHasAulasService";
import { CreateConteudoHasAulasService } from "../../services/conteudos/conteudo-has-aulas/CreateConteudoHasAulasService";
import { CreateConteudoHasAtividadesService } from "../../services/conteudos/conteudo-has-atividades/CreateConteudoHasAtividadesService";
import { CreateConteudoHasItensService } from "../../services/conteudos/conteudo-has-itens/CreateConteudoHasItensService";
import { DeleteManyConteudoHasItensService } from "../../services/conteudos/conteudo-has-itens/DeleteManyConteudoHasItensService";


class UpdateConteudoController {
  async handle(req:Request, res:Response) {

    const { id } = req.params;

    // Dados do corpo da requisição
    const { name, id_disciplina, id_bimestre, array_conteudos, status } = req.body;

    // Repositório dos modelos do Prisma
    const prismaConteudosRepository = new PrismaConteudosRepository();
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
    const prismaAulasRepository = new PrismaAulasRepository();
    const prismaBimestresRepository = new PrismaBimestresRepository();
    const prismaConteudoHasAulasRepository = new PrismaConteudoHasAulasRepository();
    const prismaAtividadesRepository = new PrismaAtividadesRepository();
    const prismaConteudoHasAtividadesRepository = new PrismaConteudoHasAtividadesRepository();
    const prismaConteudoHasItensRepository = new PrismaConteudoHasItensRepository();
    
    // Service do Conteúdo =================================================================================================
    const updateConteudoService = new UpdateConteudoService(prismaConteudosRepository, prismaDisciplinasRepository, prismaBimestresRepository);

    // Executando o service
    const conteudo = await updateConteudoService.execute({
      id,
      name,
      id_disciplina,
      id_bimestre,
      status
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(conteudo instanceof Error) {
      return res.status(400).send(conteudo.message);
    }

    
    // A variável "array_conteudos" é opcional, portanto, o service seguinte só é chamado caso ela não seja nula
    if (array_conteudos && array_conteudos.length != 0) {

      const deleteManyConteudoHasItensService = new DeleteManyConteudoHasItensService(prismaConteudosRepository, prismaConteudoHasItensRepository);
      const deleteManyConteudoHasAulasService = new DeleteManyConteudoHasAulasService(prismaConteudosRepository, prismaConteudoHasAulasRepository);
      const createConteudoHasAulasService = new CreateConteudoHasAulasService(prismaConteudosRepository, prismaAulasRepository, prismaConteudoHasAulasRepository);
      const createConteudoHasAtividadesService = new CreateConteudoHasAtividadesService(prismaConteudosRepository, prismaAtividadesRepository, prismaConteudoHasAtividadesRepository);
      const createConteudoHasItensService = new CreateConteudoHasItensService(prismaConteudosRepository, prismaAulasRepository, prismaAtividadesRepository, prismaConteudoHasItensRepository);

      // Apaga as relações entre as tabelas
      // Apagando as aulas antigas deste conteúdo
      try {
        await deleteManyConteudoHasItensService.execute({ id_conteudo: Object(conteudo).id })
      } catch (err) {
        return err;
      }

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
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateConteudoController };

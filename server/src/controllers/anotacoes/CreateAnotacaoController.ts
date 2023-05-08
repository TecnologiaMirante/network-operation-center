import { Request, Response } from "express";
import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
import { PrismaAnotacaoHasTagsRepository } from "../../repositories/prisma/anotacoes/prisma-anotacao-has-tags-repository";
import { PrismaAnotacoesRepository } from "../../repositories/prisma/anotacoes/prisma-anotacoes-repository";
import { PrismaAulasRepository } from "../../repositories/prisma/aulas/prisma-aulas-repository";
import { PrismaTagsRepository } from "../../repositories/prisma/tags/prisma-tags-repository";
import { CreateAnotacaoHasTagService } from "../../services/anotacoes/anotacao-has-tags/CreateAnotacaoHasTagService";
import { CreateAnotacaoService } from "../../services/anotacoes/CreateAnotacaoService";
import { CreateTagService } from "../../services/tags/CreateTagService";
import { FindTagByNameService } from "../../services/tags/FindTagByNameService";
import { FindAlunoFavoritaAulaController } from "../favoritos/FindFavoritoController";

class CreateAnotacaoController {
  async handle(req:Request, res:Response) {

    
    // Dados do corpo da requisição
    const { descricao, id_aluno, array_tags  } = req.body;
    
    let { id_aula } = req.body

    if (!id_aula) {
      id_aula = null
    }

    // Repositório do modelo do prisma
    const prismaAnotacoesRepository = new PrismaAnotacoesRepository();
    const prismaAlunosRepository = new PrismaAlunosRepository();
    const prismaAulasRepository = new PrismaAulasRepository();
    const prismaAnotacaoHasTagsRepository = new PrismaAnotacaoHasTagsRepository();
    const prismaTagsRepository = new PrismaTagsRepository();

    // Services ----------------------------------------------------------------------------------------------------------------
    const createAnotacaoService = new CreateAnotacaoService(prismaAnotacoesRepository, prismaAlunosRepository, prismaAulasRepository);
    const findTagByNameService = new FindTagByNameService(prismaTagsRepository);
    const createAnotacaoHasTagService = new CreateAnotacaoHasTagService(prismaAnotacaoHasTagsRepository, prismaAnotacoesRepository, prismaTagsRepository);
    const createTagService = new CreateTagService(prismaTagsRepository);

    // Executando o service
    const anotacao = await createAnotacaoService.execute({
      descricao, 
      id_aluno, 
      id_aula
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(anotacao instanceof Error) {
      return res.status(400).send(anotacao.message);
    }

    // Iremos percorrer o array de tags e verificar ...
    // As que já existirem, relacionamos na tabela N x N (anotacao_has_tags)
    // As que não existirem, criamos e relacionamos
    // Simples, não?


    // Percorrendo as tags desta anotação
    for (let tag of array_tags) {

      let tag_adicionada;

      // Buscando se a tag existe
      tag_adicionada = await findTagByNameService.execute({ name: tag });

      // Se a tag NÃO existir
      if (!tag_adicionada) {

        // Então iremos criar a tag ...
        tag_adicionada = await createTagService.execute({
          name: tag,
        })
      }

      // Se a tag existir ...
      if (tag_adicionada) {
        
        // Iremos relacionar a anotação com a tag na tabela N x N
        const anotacao_has_tag = await createAnotacaoHasTagService.execute({ 
          id_anotacao: Object(anotacao).id, 
          id_tag: Object(tag_adicionada).id
        })
      };
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Anotação criada com sucesso!",
      }
    );
  }
}

export { CreateAnotacaoController };
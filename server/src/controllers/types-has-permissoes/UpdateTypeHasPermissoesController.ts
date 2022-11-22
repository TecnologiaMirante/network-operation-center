import { Request, Response } from "express";
import { PrismaEscolaUserTypesRepository } from "../../repositories/prisma/escolas/prisma-escolas-user-types-repository";
import { PrismaPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-permissoes-repository";
import { PrismaUserTypeHasPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-user-type-has-permissoes-repository";
import { UpdateTypeHasPermissoesService } from "../../services/types-has-permissoes/UpdateTypeHasPermissoesService";

class UpdateTypeHasPermissoesController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { id_type, id_permissao } = req.body;

    // Repositório do modelo Escola do Prisma
    const prismaUserTypeHasPermissoesRepository = new PrismaUserTypeHasPermissoesRepository();
    const prismaUserTypeRepository = new PrismaEscolaUserTypesRepository();
    const prismaPermissoesRepository = new PrismaPermissoesRepository();

    // Service da Escola
    const updateTypeHasPermissoesService = new UpdateTypeHasPermissoesService(
      prismaUserTypeHasPermissoesRepository,
      prismaUserTypeRepository, 
      prismaPermissoesRepository
    );

    // Executando o service
    const escola = await updateTypeHasPermissoesService.execute({
      id,
      id_type,
      id_permissao, 
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escola instanceof Error) {
      return res.status(400).send(escola.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateTypeHasPermissoesController };
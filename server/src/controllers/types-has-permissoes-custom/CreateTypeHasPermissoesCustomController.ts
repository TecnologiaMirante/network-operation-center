import { Request, Response } from "express";
import { PrismaEscolaUserTypesRepository } from "../../repositories/prisma/escolas/prisma-escolas-user-types-repository";
import { PrismaPermissoesRepository } from "../../repositories/prisma/permissoes/prisma-permissoes-repository";
import { PrismaUserTypeHasPermissoesCustomRepository } from "../../repositories/prisma/permissoes/prisma-user-type-has-permissoes-custom-repository";
import { CreateTypeHasPermissoesCustomService } from "../../services/types-has-permissoes-custom/CreateTypeHasPermissoesCustomService";
import { PrismaEscolaUsersRepository } from "../../repositories/prisma/escolas/prisma-escolas-users-repository";

class CreateTypeHasPermissoesCustomController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { id_type, id_permissao, id_escola_user } = req.body;

    // Repositório do modelo Escola do Prisma
    const prismaUserTypeHasPermissoesCustomRepository = new PrismaUserTypeHasPermissoesCustomRepository();
    const prismaUserTypeRepository = new PrismaEscolaUserTypesRepository();
    const prismaPermissoesRepository = new PrismaPermissoesRepository();
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();

    // Service da Escola
    const createTypeHasPermissoesCustomService = new CreateTypeHasPermissoesCustomService(
      prismaUserTypeHasPermissoesCustomRepository,
      prismaUserTypeRepository, 
      prismaPermissoesRepository,
      prismaEscolaUsersRepository
    );

    // Executando o service
    const escola = await createTypeHasPermissoesCustomService.execute({
      id_type,
      id_permissao, 
      id_escola_user
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escola instanceof Error) {
      return res.status(400).send(escola.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateTypeHasPermissoesCustomController };
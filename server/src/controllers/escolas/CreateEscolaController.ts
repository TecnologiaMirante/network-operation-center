import { Request, Response } from "express";
import { NodemailerMailAdapter } from "../../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaEscolasRepository } from "../../repositories/prisma/escolas/prisma-escolas-repository";
import { PrismaEscolaUsersRepository } from "../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { PrismaResponsaveisRepository } from "../../repositories/prisma/responsaveis/prisma-responsaveis-repository";
import { PrismaSecretariasRepository } from "../../repositories/prisma/secretarias/prisma-secretarias-repository";
import { CreateEscolaService } from "../../services/escolas/CreateEscolaService";
import { CreateEscolaFirstUserService } from "../../services/escolas/escola-users/CreateEscolaFirstUserService";

class CreateEscolaController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, email, school_type, id_secretaria } = req.body;

    // Repositório do modelo Escola do Prisma
    const prismaEscolasRepository = new PrismaEscolasRepository();
    const prismaSecretariasRepository = new PrismaSecretariasRepository();
    const prismaResponsaveisRepository = new PrismaResponsaveisRepository();
    const prismaEscolasUsersRepository = new PrismaEscolaUsersRepository();
    // const nodemailerMailAdapter = new NodemailerMailAdapter();

    // Service da Escola ----------------------------------------------------------------------------------------------------------------
    const createEscolaService = new CreateEscolaService(prismaEscolasRepository, prismaSecretariasRepository);

    // Executando o service para criar a escola
    const escola = await createEscolaService.execute({
      name,
      school_type, 
      id_secretaria
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escola instanceof Error) {
      return res.status(400).send(escola.message);
    }

    // // Service do EscolaUser  ----------------------------------------------------------------------------------------------------------------
    // // Quando uma escola é criada, um user padrão deve ser criado, a senha será gerada automaticamente e o usuário terá o nome da escola
    // const createEscolaUserService = new CreateEscolaFirstUserService(prismaEscolasUsersRepository, prismaEscolasRepository, prismaResponsaveisRepository);

    // // Criando nome específico
    // const userName = "escola" + "-" + Math.random().toString(36).slice(-3);

    // const escolaUser = await createEscolaUserService.execute({
    //   name: Object(escola).name,
    //   mat: userName,
    //   email: email,
    //   id_escola: Object(escola).id,
    // })

    // // Caso aconteça algum erro na criação do usuário padrão, interrompe o processo retorna a mensagem de erro
    // if(escolaUser instanceof Error) {
    //   return res.status(400).send(escolaUser.message);
    // }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Escola criada com sucesso!",
      }
    );
  }
}

export { CreateEscolaController };
import { Request, Response } from "express";
// import { NodemailerMailAdapter } from "../../adapters/nodemailer/nodemailer-mail-adapter";
import { PrismaEscolaUsersRepository } from "../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { PrismaResponsaveisRepository } from "../../repositories/prisma/responsaveis/prisma-responsaveis-repository";
import { CreateResponsavelService } from "../../services/responsaveis/CreateResponsavelService";

class CreateResponsavelController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { name, email, cpf, phone } = req.body;

    // Repositório do modelo do Prisma
    const prismaResponsaveisRepository = new PrismaResponsaveisRepository();
    const prismaEscolasUsersRepository = new PrismaEscolaUsersRepository();
    // const nodemailerMailAdapter = new NodemailerMailAdapter();

    // Service
    const createResponsavelService = new CreateResponsavelService(
      prismaEscolasUsersRepository, 
      prismaResponsaveisRepository, 
      // nodemailerMailAdapter
      );

    // Executando o service
    const resp = await createResponsavelService.execute({
      name, 
      email, 
      cpf, 
      phone
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(resp instanceof Error) {
      return res.status(400).send(resp.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Responsável criado com sucesso!",
      }
    );
  }
}

export { CreateResponsavelController };
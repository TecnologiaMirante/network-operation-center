import { Request, Response } from "express";
import { LoginResponsavelService } from "../../services/responsaveis/LoginResponsavelService";
import { FindResponsavelService } from "../../services/responsaveis/FindResponsavelService";
import { PrismaResponsaveisRepository } from "../../repositories/prisma/responsaveis/prisma-responsaveis-repository";

class LoginResponsavelController {
  async handle(req:Request, res:Response) {

    // Dados do corpo da requisição
    const { cpf, password } = req.body;

    // Repositório do modelo responsavel do Prisma
    const prismaResponsaveisRepository = new PrismaResponsaveisRepository();

    // Service do login
    const loginResponsavelService = new LoginResponsavelService(prismaResponsaveisRepository);

    // Executando o service
    const resp = await loginResponsavelService.execute({
      cpf,
      password,
    })

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(resp instanceof Error) {
      return res.status(400).send(resp.message);
    }

    // Service
    const findResponsavelService = new FindResponsavelService(prismaResponsaveisRepository);

    // Executando o service
    const user = await findResponsavelService.execute({ id: Object(resp).resp_id });
    
    if(user instanceof Error) {
      return res.status(400).send(user.message)
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        data: {
          token: Object(resp).token,
          user
        }
      }
    );
  }
}

export { LoginResponsavelController };
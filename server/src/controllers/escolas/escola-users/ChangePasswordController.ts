import { Request, Response} from "express";
import { PrismaEscolaUsersRepository } from "../../../repositories/prisma/escolas/prisma-escolas-users-repository";
import { ChangePasswordService } from "../../../services/escolas/escola-users/ChangePasswordService";

class ChangePasswordController {
  async handle(req:Request, res:Response) {
    
    // Dados do parâmetro da requisição
    const { actual_password, new_password, id_user } = req.body;

    // Repositório do modelo do Prisma
    const prismaEscolaUsersRepository = new PrismaEscolaUsersRepository();
    
    // Service
    const changePasswordService = new ChangePasswordService(prismaEscolaUsersRepository);

    // Executando o service
    const escolaUsers = await changePasswordService.execute({actual_password, new_password, id_user});

    // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
    if(escolaUsers instanceof Error) {
      return res.status(400).send(escolaUsers.message);
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Senha atualizada com sucesso!"
      }
    )

  };
}

export { ChangePasswordController };
import { Request, Response } from "express";
import { PrismaEscolasRepository } from "../../repositories/prisma/escolas/prisma-escolas-repository";
import { PrismaSecretariasRepository } from "../../repositories/prisma/secretarias/prisma-secretarias-repository";
import { UpdateEscolaService } from "../../services/escolas/UpdateEscolaService";

class UpdateEscolaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { name, school_type, id_secretaria } = req.body;

    // Repositório do modelo Escola do Prisma
    const prismaEscolasRepository = new PrismaEscolasRepository();
    // Repositório do modelo escola do Prisma
    const prismaSecretariasRepository = new PrismaSecretariasRepository();

    // Service da escola
    const updateEscolaservice = new UpdateEscolaService(prismaEscolasRepository, prismaSecretariasRepository);

    // Executando o service
    const escola = await updateEscolaservice.execute({
      id,
      name,
      school_type,
      id_secretaria
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

export { UpdateEscolaController };
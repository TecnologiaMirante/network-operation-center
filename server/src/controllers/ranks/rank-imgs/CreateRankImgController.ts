import { Request, Response } from "express";
import { CreateRankImgService } from "../../../services/ranks/rank-imgs/CreateRankImgService";
import { PrismaRanksRepository } from "../../../repositories/prisma/ranks/rank-imgs-repository";

class CreateRankImgController {
  async handle(req:Request, res:Response) {

    // Repositório do modelo do Prisma
    const prismaRanksRepository = new PrismaRanksRepository();

    // Service
    const createRankImgService = new CreateRankImgService(prismaRanksRepository);

    // // Vendo a parte do arquivo ÍCONE
    if(req.files != null || req.files != undefined) {

      // Se o usuário enviar algum icone
      if (Object.keys(req.files).length > 0) {

        let first = "";
        let second = "";
        let third = "";

        if (Object.keys(req.files).includes("first")) {

          const indice = Object.keys(req.files).indexOf("first")

          first = "http://192.168.6.20:3010/files/" + Object.values(req.files)[indice][0].filename;
          // const img = "https://mais-edu.herokuapp.com/files/" + Object.values(req.files)[indice][0].filename;
        }

        if (Object.keys(req.files).includes("second")) {

            const indice = Object.keys(req.files).indexOf("second")
  
            second = "http://192.168.6.20:3010/files/" + Object.values(req.files)[indice][0].filename;
            // const img = "https://mais-edu.herokuapp.com/files/" + Object.values(req.files)[indice][0].filename;
        }

        if (Object.keys(req.files).includes("third")) {

            const indice = Object.keys(req.files).indexOf("third")
  
            third = "http://192.168.6.20:3010/files/" + Object.values(req.files)[indice][0].filename;
            // const img = "https://mais-edu.herokuapp.com/files/" + Object.values(req.files)[indice][0].filename;
        }

        // Executando o service
        const dado = await createRankImgService.execute({
            first,
            second,
            third
        })

        // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
        if(dado instanceof Error) {
            return res.status(400).send(dado.message);
        }
      }
    }


    // Retornando mensagem de sucesso para o usuário
    return res.status(201).send(
      {
        message:"Criado com sucesso!",
      }
    );
  }
}

export { CreateRankImgController };
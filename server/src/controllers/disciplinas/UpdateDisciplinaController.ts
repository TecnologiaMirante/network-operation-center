import { Request, Response } from "express";
import { PrismaDisciplinasRepository } from "../../repositories/prisma/disciplinas/prisma-disciplinas-repository";
import { UpdateDisciplinaService } from "../../services/disciplinas/UpdateDisciplinaService";
import { PrismaEscolasRepository } from "../../repositories/prisma/escolas/prisma-escolas-repository";

class UpdateDisciplinaController {
  async handle(req:Request, res:Response) {

    // Dados do parâmetro da requisição
    const { id } = req.params;

    // Dados do corpo da requisição
    const { name, code, status, id_escola, bk_color } = req.body;

    // Repositório do modelo do Prisma
    const prismaDisciplinasRepository = new PrismaDisciplinasRepository();
    const prismaEscolasRepository = new PrismaEscolasRepository();

    // Service
    const updateDisciplinaService = new UpdateDisciplinaService(prismaDisciplinasRepository, prismaEscolasRepository);

    let bk_img = "";
    let icon = "";

    // // Vendo a parte do arquivo ÍCONE
    if(req.files != null || req.files != undefined) {

       // Se o usuário enviar algum arquivo
       if (Object.keys(req.files).length > 0) {
        
        // Se o usuário enviar alguma imagem de fundo
        if (Object.keys(req.files).includes("bk_img")) {

          const indice = Object.keys(req.files).indexOf("bk_img")

          bk_img = "http://192.168.6.20:3010/files/" + Object.values(req.files)[indice][0].filename;
          // bk_img = "https://mais-edu.herokuapp.com/files/" + Object.values(req.files)[indice][0].filename;
        }

        // Se o usuário enviar algum ícone
        if (Object.keys(req.files).includes("icon")) {

          const indice = Object.keys(req.files).indexOf("icon")

          icon = "http://192.168.6.20:3010/files/" + Object.values(req.files)[indice][0].filename;
        //  icon = "https://mais-edu.herokuapp.com/files/" + Object.values(req.files)[indice][0].filename;
        }

        // Executando o service
        const disciplina = await updateDisciplinaService.execute({
          id,
          name, 
          code,
          status,
          id_escola,
          icon,
          bk_img,
          bk_color
        })

        // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
        if(disciplina instanceof Error) {
          return res.status(400).send(disciplina.message);
        }
      }
    }

    // Retornando mensagem de sucesso para o usuário
    return res.status(200).send(
      {
        message:"Atualizado com sucesso!",
      }
    );
  }
}

export { UpdateDisciplinaController };
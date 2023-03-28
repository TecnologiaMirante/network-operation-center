// import { Request, Response } from "express";
// import { PrismaAlunoRespondeAtividadesRepository } from "../../../repositories/prisma/alunos/prisma-aluno-responde-atividade";
// import { PrismaAlunosRepository } from "../../../repositories/prisma/alunos/prisma-alunos-repository";
// import { PrismaAtividadesRepository } from "../../../repositories/prisma/atividades/prisma-atividades-repository";
// import { UpdateAlunoRespondeAtividadeService } from "../../../services/alunos/aluno-responde-atividades/UpdateAlunoRespondeAtividadeService";

// class UpdateAlunoRespondeAtividadeController {
//   async handle(req:Request, res:Response) {

//     // Dados do parâmetro da requisição
//     const { id } = req.body;

//     // Dados do corpo da requisição
//     const { nota, id_aluno, id_atividade  } = req.body;

//     // Repositório do modelo do prisma
//     const prismaAlunoRespondeAtividadesRepository = new PrismaAlunoRespondeAtividadesRepository();
//     const prismaAlunosRepository = new PrismaAlunosRepository();
//     const prismaAtividadesRepository = new PrismaAtividadesRepository();

//     // Service ----------------------------------------------------------------------------------------------------------------
//     const updateAlunoRespondeAtvService = new UpdateAlunoRespondeAtividadeService(prismaAlunoRespondeAtividadesRepository, prismaAlunosRepository, prismaAtividadesRepository);

//     // Executando o service
//     const alunoRespondeAtv = await updateAlunoRespondeAtvService.execute({
//       id,
//       nota, 
//       id_aluno, 
//       id_atividade
//     })

//     // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
//     if(alunoRespondeAtv instanceof Error) {
//       return res.status(400).send(alunoRespondeAtv.message);
//     }

//     // Retornando mensagem de sucesso para o usuário
//     return res.status(200).send(
//       {
//         message:"Atualizado com sucesso!",
//       }
//     );
//   }
// }

// export { UpdateAlunoRespondeAtividadeController };
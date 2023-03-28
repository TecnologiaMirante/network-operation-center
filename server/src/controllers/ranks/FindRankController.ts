// import { Request, Response } from "express";
// import { PrismaRanksRepository } from "../../repositories/prisma/ranks/prisma-ranks-repository";
// import { PrismaAlunosRepository } from "../../repositories/prisma/alunos/prisma-alunos-repository";
// import { FindRankService } from "../../services/ranks/FindRankService";

// class FindRankController {
//   async handle(req:Request, res:Response) {

//     // Dados do corpo da requisição
//     const { type, id_aluno } = req.params;

//     // Repositório do modelo do prisma
//     const prismaRanksRepository = new PrismaRanksRepository();
//     const prismaAlunosRepository = new PrismaAlunosRepository();

//     // Service ----------------------------------------------------------------------------------------------------------------
//     const findRankService = new FindRankService(prismaRanksRepository, prismaAlunosRepository);

//     // Executando o service
//     const rank = await findRankService.execute({
//       type,
//       id_aluno
//     })

//     // Caso aconteça algum erro, interrompe o processo retorna a mensagem de erro
//     if(rank instanceof Error) {
//       return res.status(400).send(rank.message);
//     }

//     // Retornando mensagem de sucesso para o usuário
//     return res.status(200).send(
//         rank
//     );
//   }
// }

// export { FindRankController };
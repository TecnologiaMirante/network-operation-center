// import { Request, Response } from "express";
// import { PrismaAlunoRespondeAtividadesRepository } from "../../../repositories/prisma/alunos/prisma-aluno-responde-atividade";
// import { PrismaAlunosRepository } from "../../../repositories/prisma/alunos/prisma-alunos-repository";
// import { PrismaAtividadesRepository } from "../../../repositories/prisma/atividades/prisma-atividades-repository";
// import { PrismaSeriesRepository } from "../../../repositories/prisma/series/prisma-series-repository";
// import { CreateAlunoRespondeAtividadeService } from "../../../services/alunos/aluno-responde-atividades/CreateAlunoRespondeAtividadeService";
// import { GetSerieAlunosService } from "../../../services/series/GetSerieAlunosService";

// class Macro {
//   async handle(req:Request, res:Response) {

//     // Dados do parâmetro da requisição
//     const { id } = req.params;

//     // Repositório do modelo do prisma
//     const prismaAlunoRespondeAtividadesRepository = new PrismaAlunoRespondeAtividadesRepository();
//     const prismaAlunosRepository = new PrismaAlunosRepository();
//     const prismaAtividadesRepository = new PrismaAtividadesRepository();

//     // Service Get Alunos
//     // Repositório do modelo do Prisma
//     const prismaSeriesRepository = new PrismaSeriesRepository();

//     // Service
//     const getSerieAlunosService = new GetSerieAlunosService(prismaSeriesRepository);
//     const createAlunoRespondeAtvService = new CreateAlunoRespondeAtividadeService(prismaAlunoRespondeAtividadesRepository, prismaAlunosRepository, prismaAtividadesRepository);

//     // Executando o service
//     const alunos = await getSerieAlunosService.execute({
//       id,
//     })

//     for (let aux of Object(alunos).alunos[0].Turma[0].Aluno) {

//         // Executando o service
//         const alunoRespondeAtv = await createAlunoRespondeAtvService.execute({
//             nota: 9.0,
//             id_aluno: aux.id, 
//             id_atividade: "71aa286c-013e-4ced-ac1c-4809bb693f7b"
//         })
//     }

//     return res.status(200).send(alunos)
//   }
// }

// export { Macro };




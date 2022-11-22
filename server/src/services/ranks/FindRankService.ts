// import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
// import { RanksRepository, rank_type } from "../../repositories/interfaces/ranks/ranks-repository";

// // Interface
// interface FindRankRequest {
//   type: string;
//   id_aluno: string;
// }

// // Service
// export class FindRankService {
  
//   // Recebendo o repositório da Rank no construtor
//   constructor(
//     private ranksRepository: RanksRepository,
//     private alunosRepository: AlunosRepository,
//   ) {}

//   // Executando o service
//   async execute(request: FindRankRequest) {
    
//     // Dados do service
//     const { type, id_aluno } = request;

//     try {
//       const aluno = await this.alunosRepository.find( { id: id_aluno } )
//       if (!aluno) {
//         return new Error ("Aluno inexistente!");
//       }
//     } catch (err) {
//       return err;
//     }

//     const num_type = parseInt(type);

//     try {

//       // Buscando ...
//       if (num_type == 1) {
//         const rank = await this.ranksRepository.findTurma({ id_aluno });
//         return rank;
//       } if (num_type == 2) {
//         const rank = await this.ranksRepository.findSerie({ id_aluno });
//         return rank;
//       } else {
//         return new Error("Rank inexistente!")
//       }

//     } catch (err) {
//       return err;
//     }
//   }
// }
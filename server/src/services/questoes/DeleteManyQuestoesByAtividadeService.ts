// import { questao_difficulty, QuestoesRepository } from "../../repositories/interfaces/questoes/questoes-repository";

// export interface Array_questoes {
//   id: string;
// }

// // Interface
// interface DeleteManyQuestoesByAtividadeRequest {
//   data: Array_questoes[];
// }

// // Service
// export class DeleteManyQuestoesByAtividadeService {
  
//   // Recebendo o repositório
//   constructor(
//     private questoesRepository: QuestoesRepository,
//   ) {}

//   // Executando o service
//   async execute(request: DeleteManyQuestoesByAtividadeRequest) {
    
//     // Dados do service
//     const { data } = request;

//     // Buscando todas as questões da atividade

//     // Atualizando ...
//     const questao = await this.questoesRepository.deleteMany({
//       id,
//     })

//     // Se não existir questao
//     if (!questao) {
//       return new Error("Questão inexistente!");
//     }

//     return this.questoesRepository.delete({id});
//   }
// }
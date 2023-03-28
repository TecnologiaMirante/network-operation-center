import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";

// Service
export class GetAlunosService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor(
    private alunosRepository: AlunosRepository,
  ) {}

  // Executando o service
  async execute() {

    // Buscando ...
    const alunos = await this.alunosRepository.get()
    
    // Caso não existam no sistema, retorna erro
    if (Object.keys(alunos).length == 0) {
      return new Error("Nenhum aluno cadastrado!")
    } 

    // Retornando os alunos encontrados ...
    return alunos;
  }
}
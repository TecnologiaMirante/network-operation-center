import { AlunosRepository } from "../../repositories/interfaces/alunos/alunos-repository";
import { LembretesRepository } from "../../repositories/interfaces/lembretes/lembretes-repository";
import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { TurmasRepository } from "../../repositories/interfaces/turmas/turmas-repository";

// Interface
interface DeleteLembreteRequest {
  id: string;
}

// Service
export class DeleteLembreteService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private lembretesRepository: LembretesRepository,
  ) {}

  // Executando o service
  async execute(request: DeleteLembreteRequest) {
    
    // Dados do service
    const { id } = request;

    // Se id for inserido, busca se a turma existe e retorna erro caso não
    if (!(await this.lembretesRepository.find({ id: id }))) {
      return new Error("Lembrete inexistente!")
    }

    // Deletando ...
    return await this.lembretesRepository.delete({
      id, 
    })
  }
}
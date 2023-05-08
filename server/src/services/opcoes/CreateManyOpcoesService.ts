<<<<<<< HEAD
import { OpcoesRepository } from "../../repositories/interfaces/opcoes/opcoes-repository";
import { QuestoesRepository } from "../../repositories/interfaces/questoes/questoes-repository";

// Interface
interface Opcao {
  description: string;
  is_correct: boolean;
  id_questao: string;
}

interface CreateManyOpcoesRequest {
  array_opcao: Opcao[];
}

// Service
export class CreateManyOpcoesService {
  
  // Recebendo o repositório
  constructor(
    private opcoesRepository: OpcoesRepository,
    private questoesRepository: QuestoesRepository
  ) {}

  // Executando o service
  async execute(request: CreateManyOpcoesRequest) {

    // Dados do service 
    const { array_opcao } = request;

    try {
      // Verificando se a questão existe
      if(!(await this.questoesRepository.find({id: array_opcao[0].id_questao}))){
        // Se a questão não existir
        return new Error("Questão inexistente!");
      }
      
    } catch (err) {
      return err;
    }
    
    // Criando ...
    return await this.opcoesRepository.createMany({
      data: array_opcao
    })
  }
=======
import { OpcoesRepository } from "../../repositories/interfaces/opcoes/opcoes-repository";
import { QuestoesRepository } from "../../repositories/interfaces/questoes/questoes-repository";

// Interface
interface Opcao {
  description: string;
  is_correct: boolean;
  id_questao: string;
}

interface CreateManyOpcoesRequest {
  array_opcao: Opcao[];
}

// Service
export class CreateManyOpcoesService {
  
  // Recebendo o repositório
  constructor(
    private opcoesRepository: OpcoesRepository,
    private questoesRepository: QuestoesRepository
  ) {}

  // Executando o service
  async execute(request: CreateManyOpcoesRequest) {

    // Dados do service 
    const { array_opcao } = request;

    try {
      // Verificando se a questão existe
      if(!(await this.questoesRepository.find({id: array_opcao[0].id_questao}))){
        // Se a questão não existir
        return new Error("Questão inexistente!");
      }
      
    } catch (err) {
      return err;
    }
    
    // Criando ...
    const dado = await this.opcoesRepository.createMany({
      data: array_opcao
    })

    return dado;
  }
>>>>>>> a0b295eeda05e1d8006bf3f9bfc720e423364484
}
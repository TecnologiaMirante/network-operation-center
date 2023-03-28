import { BimestresRepository } from "../../repositories/interfaces/bimestres/bimestres-repository";

// Service
export class GetBimestresService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private bimestresRepository: BimestresRepository,
  ) {}

  // Executando o service
  async execute() {

    // Criando ...
    const bimestres = await this.bimestresRepository.get();

    // Caso não existam bimestres no sistema, retorna erro
    if (Object.keys(bimestres).length == 0) {
      return new Error("Nenhum bimestre cadastrado!")
    } 

    return bimestres;
  }
}
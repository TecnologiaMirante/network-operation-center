import { BimestresRepository } from "../../repositories/interfaces/bimestres/bimestres-repository";

// Interface
interface CreateBimestreRequest {
  number: number;
  start: Date;
  end: Date;
}

// Service
export class CreateBimestreService {
  
  // Recebendo o repositório da Aluno no construtor
  constructor( 
    private bimestresRepository: BimestresRepository,
  ) {}

  // Executando o service
  async execute(request: CreateBimestreRequest) {
    
    // Dados do service
    const { number, start, end } = request;

    // Criando ...
    const lembrete = await this.bimestresRepository.create({
      number,
      start,
      end,
    })

    return lembrete;
  }
}
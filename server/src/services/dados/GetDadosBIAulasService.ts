import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { DadosBIAulasRepository } from "../../repositories/interfaces/dados/dados-BI-AULAS-repository";

// Interface do GetDadosBIAulas
interface GetDadosBIAulasServiceRequest {
  id_professor: string;
}

// Service
export class GetDadosBIAulasService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professoresRepository: ProfessoresRepository,
    private dadosBIAulasRepository: DadosBIAulasRepository,
  ) {}

  // Executando o service
  async execute({ id_professor }: GetDadosBIAulasServiceRequest) {
    
    // Verificando se o professor existe
    if (!(await this.professoresRepository.find({ id: id_professor }))) {
        return new Error("Professor inexistente");
    }

    try {
        // Buscando os dados
        const dados = await this.dadosBIAulasRepository.BIAulas({ id_professor });

        // Caso não existam no sistema, retorna erro
        if (Object.keys(dados).length == 0) {
            return new Error("Nenhum dado cadastrado!")
        } 

        // Retornando os dados encontrados para o controller ...
        return dados;        
    } catch (err) {
        return err;
    }

  }
}
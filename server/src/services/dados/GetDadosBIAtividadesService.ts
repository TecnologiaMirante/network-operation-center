import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { DadosBIAtividadesRepository } from "../../repositories/interfaces/dados/dados-BI-ATIVIDADES-repository";

// Interface do GetDadosBIAtividades
interface GetDadosBIAtividadesServiceRequest {
  id_professor: string;
}

// Service
export class GetDadosBIAtividadesService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professoresRepository: ProfessoresRepository,
    private dadosBIAtividadesRepository: DadosBIAtividadesRepository,
  ) {}

  // Executando o service
  async execute({ id_professor }: GetDadosBIAtividadesServiceRequest) {
    
    // Verificando se o professor existe
    if (!(await this.professoresRepository.find({ id: id_professor }))) {
        return new Error("Professor inexistente");
    }

    try {
        // Buscando os dados
        const dados = await this.dadosBIAtividadesRepository.BIAtividades({ id_professor });

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
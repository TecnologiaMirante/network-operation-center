import { ProfessoresRepository } from "../../repositories/interfaces/professores/professores-repository";
import { DadosDropdownRepository } from "../../repositories/interfaces/dados/dados-dropdown-repository";

// Interface do GetDadosDropdownByProfessor
interface GetDadosDropdownByProfessorServiceRequest {
  id_professor: string;
}

// Service
export class GetDadosDropdownByProfessorService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private professoresRepository: ProfessoresRepository,
    private dadosDropdownRepository: DadosDropdownRepository,
  ) {}

  // Executando o service
  async execute({ id_professor }: GetDadosDropdownByProfessorServiceRequest) {
    
    // Verificando se o professor existe
    if (!(await this.professoresRepository.find({ id: id_professor }))) {
        return new Error("Professor inexistente");
    }

    try {
        // Buscando os dados
        const dados = await this.dadosDropdownRepository.dropdownTodos({ id_professor });
        // const dados = await this.dadosDropdownRepository.dropdownGetByProfessor({ id_professor });

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
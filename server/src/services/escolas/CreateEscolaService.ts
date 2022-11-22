import { EscolasRepository } from "../../repositories/interfaces/escolas/escolas-repository";
import { SecretariasRepository } from "../../repositories/interfaces/secretarias/secretarias-repository";
import { school_type } from "../../repositories/interfaces/escolas/escolas-repository";

// Interface do createEscola
interface CreateEscolaRequest {
  name: string;
  school_type: school_type;
  id_secretaria?: string;
}

// Service
export class CreateEscolaService {
  
  // Recebendo o repositório da Escola no construtor
  constructor(
    private escolasRepository: EscolasRepository,
    private secretariasRepository: SecretariasRepository,
  ) {}

  // Executando o service
  async execute(request: CreateEscolaRequest) {
    
    // Dados do service
    const { name, school_type, id_secretaria } = request;

    // Se o usuário não inserir os dados obrigatórios
    if (!name || !school_type) {
      return new Error(`Por favor, preencha todos os campos obrigatórios!`);
    }

    if (id_secretaria) {
      // Verificando se a secretaria existe
      if(!(await this.secretariasRepository.find({id: id_secretaria}))){
        return new Error("Secretaria inexistente!");
      }
    }

    // Criando a Escola ...
    const escola = await this.escolasRepository.create({
      name,
      school_type,
      id_secretaria
    })

    return escola;
  }
}
import { EscolasRepository } from "../../repositories/interfaces/escolas/escolas-repository";
import { SecretariasRepository } from "../../repositories/interfaces/secretarias/secretarias-repository";
import { school_type } from "../../repositories/interfaces/escolas/escolas-repository";

// Interface do UpdateEscola
interface UpdateEscolaRequest {
  id: string;
  name: string;
  school_type: school_type;
  id_secretaria?: string;
}

// Service
export class UpdateEscolaService {
  
  // Recebendo o repositório da UpdateEscola no construtor
  constructor(
    private escolasRepository: EscolasRepository,
    private secretariasRepository: SecretariasRepository,
  ) {}

  // Executando o service
  async execute(request: UpdateEscolaRequest) {

    // Dados do service
    const { id, name, school_type, id_secretaria } = request;

    // Se não existir usuario, retorna mensagem de erro
    if (!(await this.escolasRepository.find({id}))) {
      return new Error("Escola inexistente!");
    }
    
    // Se o usuário não inserir nenhum dado, não há o que atualizar
    if (!name && !school_type && !id_secretaria) {
      return new Error("Por favor, insira algum dado!");
    }

    // Se o usuário inserir algum id de secretaria, verifica se ela existe
    if (id_secretaria) {
      // Verificando se a secretaria existe
      if(!(await this.secretariasRepository.find({id: id_secretaria}))){
        return new Error("Secretaria inexistente!");
      }
    }

    // Atualizando o usuario
    await this.escolasRepository.update({id, name, school_type, id_secretaria })

    return;
  }
}
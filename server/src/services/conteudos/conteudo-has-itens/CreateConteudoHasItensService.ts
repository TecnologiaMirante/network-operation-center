import { ConteudoHasItensRepository } from "../../../repositories/interfaces/conteudos/conteudo-has-itens-repository";
import { AulasRepository } from "../../../repositories/interfaces/aulas/aulas-repository";
import { ConteudosRepository } from "../../../repositories/interfaces/conteudos/conteudo-repository";
import { AtividadesRepository } from "../../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface CreateConteudoHasItensRequest {
  type: string;
  id_conteudo: string;
  id_aula?: string;
  id_atividade?: string;
}

// Service
export class CreateConteudoHasItensService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private aulasRepository: AulasRepository,
    private atividadesRepository: AtividadesRepository,
    private conteudoHasItensRepository: ConteudoHasItensRepository
  ) {}

  // Executando o service
  async execute(request: CreateConteudoHasItensRequest) {
    
    // Dados do service 
    const { type, id_conteudo, id_aula, id_atividade } = request;

    try {
      // Verifica se o conteúdo existe
      if (!(await this.conteudosRepository.find({ id: id_conteudo }))) {
        return new Error("Conteúdo inexistente!");
      }
    } catch (err) {
      return err;
    }

    if (id_aula) {
      // Verificando se a aula existe
      try {
        if (!(await this.aulasRepository.find({ id: id_aula }))) {
          // Retornando erro, caso não exista
          return new Error("Aula inexistente!")
        }
      } catch (err) {
        return err;
      }
    }

    if (id_atividade) {
      // Verificando se a atividade existe
      try {
        if (!(await this.atividadesRepository.find({ id: id_atividade }))) {
          // Retornando erro, caso não exista
          return new Error("Atividade inexistente!")
        }
      } catch (err) {
        return err;
      }
    }

    try {
      // Criando o registro das itens do conteúdo
      await this.conteudoHasItensRepository.create({
        type,
        id_conteudo,
        id_aula,
        id_atividade
      })
    } catch (err) {
      return err;
    }
  }
}

import { ConteudoHasAtividadesRepository } from "../../../repositories/interfaces/conteudos/conteudo-has-atividades-repository";
import { AtividadesRepository } from "../../../repositories/interfaces/atividades/atividades-repository";
import { ConteudosRepository } from "../../../repositories/interfaces/conteudos/conteudo-repository";

//Interface Array_atividades
// export interface Array_conteudo_atividade {
//   id_conteudo: string;
//   id_atividade: string;
// }

// Interface
interface CreateConteudoHasAtividadesRequest {
  id_conteudo: string;
  id_atividade: string;
}

// Service
export class CreateConteudoHasAtividadesService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private atividadesRepository: AtividadesRepository,
    private conteudoHasAtividadesRepository: ConteudoHasAtividadesRepository
  ) {}

  // Executando o service
  async execute(request: CreateConteudoHasAtividadesRequest) {
    
    // Dados do service 
    const { id_conteudo, id_atividade } = request;

    try {
      // Verifica se o conteúdo existe
      if (!(await this.conteudosRepository.find({ id: id_conteudo }))) {
        return new Error("Conteúdo inexistente!");
      }
    } catch (err) {
      return err;
    }

    // Verificando se a Atividade existe
    try {
      if (!(await this.atividadesRepository.find({ id: id_atividade }))) {
        // Retornando erro, caso não exista
        return new Error("Atividade inexistente!")
      }
    } catch (err) {
      return err;
    }

    // Se chegou aqui, é porque o conteúdo e a Atividade existe ...

    // Criando o registro das Atividades do conteúdo
    await this.conteudoHasAtividadesRepository.create({
      id_conteudo,
      id_atividade
    })
  }
}
import { ConteudoHasAulasRepository } from "../../../repositories/interfaces/conteudos/conteudo-has-aulas-repository";
import { AulasRepository } from "../../../repositories/interfaces/aulas/aulas-repository";
import { ConteudosRepository } from "../../../repositories/interfaces/conteudos/conteudo-repository";

//Interface Array_aulas
// export interface Array_conteudo_aula {
//   id_conteudo: string;
//   id_aula: string;
// }

// Interface
interface CreateConteudoHasAulasRequest {
  id_conteudo: string;
  id_aula: string;
}

// Service
export class CreateConteudoHasAulasService {
  
  // Recebendo o repositório
  constructor(
    private conteudosRepository: ConteudosRepository,
    private aulasRepository: AulasRepository,
    private conteudoHasAulasRepository: ConteudoHasAulasRepository
  ) {}

  // Executando o service
  async execute(request: CreateConteudoHasAulasRequest) {
    
    // Dados do service 
    const { id_conteudo, id_aula } = request;

    try {
      // Verifica se o conteúdo existe
      if (!(await this.conteudosRepository.find({ id: id_conteudo }))) {
        return new Error("Conteúdo inexistente!");
      }
    } catch (err) {
      return err;
    }

    // Verificando se a aula existe
    try {
      if (!(await this.aulasRepository.find({ id: id_aula }))) {
        // Retornando erro, caso não exista
        return new Error("Aula inexistente!")
      }
    } catch (err) {
      return err;
    }

    // Se chegou aqui, é porque o conteúdo e a aula existe ...

    try {
      // Criando o registro das aulas do conteúdo
      await this.conteudoHasAulasRepository.create({
        id_conteudo,
        id_aula
      })
    } catch (err) {
      return err;
    }
  }
}
import { AtividadesRepository } from "../../repositories/interfaces/atividades/atividades-repository";

// Interface
interface GetAtividadesByDisciplinaRequest {
  id_disciplina: string;
}

// Service
export class GetAtividadesByDisciplinaService {
  
  // Recebendo o repositório da Professor no construtor
  constructor(
    private atividadesRepository: AtividadesRepository,
  ) {}

  // Executando o service
  async execute(request: GetAtividadesByDisciplinaRequest) {
    
    // Dados do service
    const { id_disciplina } = request;

    try {
      // Buscando ...
      const atividades_base = await this.atividadesRepository.getByDisciplina({
        id_disciplina,
      })

      const atividades = [
        {
          name: "atividades",
          items: atividades_base
        },
        {
          name: "atividades_conteudo",
          items: []
        } 
      ]

      return atividades;
    } catch (err) {
      return new Error("Erro durante a busca das atividades!");
    }
  }
}
import { ConquistasRepository } from "../../../repositories/interfaces/conquistas/conquistas-repository";
import { Conquista, Responda_X_AtividadesRepository } from "../../../repositories/interfaces/conquistas/responda_x_atividades/responda_x_atividades-repository";

interface UpdateProgressResponda_X_AtividadesRequest {
    id_aluno: string;
    conquistas: Conquista[];
}

export class UpdateProgressResponda_X_AtividadesService {
    
    // Recebendo o repositório
    constructor(
        private responda_X_AtividadesRepository: Responda_X_AtividadesRepository,
    ) {}

    async execute(request: UpdateProgressResponda_X_AtividadesRequest) {
        
        const { id_aluno, conquistas } = request;

        // Se existirem
        if (conquistas.length > 0) {

            // Atualiza o progresso do aluno em cada conquista existente
            const progress = await this.responda_X_AtividadesRepository.updateProgressByAluno({ conquistas, id_aluno });
            return progress;

        } else {
            return 0;
        }

    }
    
}
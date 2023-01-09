import { ConquistasRepository } from "../../../repositories/interfaces/conquistas/conquistas-repository";
import { ConquistasId, Responda_X_AtividadesRepository } from "../../../repositories/interfaces/conquistas/responda_x_atividades/responda_x_atividades-repository";

interface CheckResponda_X_AtividadesRequest {
    id_aluno: string;
}

export class CheckResponda_X_AtividadesService {
    
    // Recebendo o repositório
    constructor(
        private conquistasRepository: ConquistasRepository,
        private responda_X_AtividadesRepository: Responda_X_AtividadesRepository,
    ) {}

    async execute(request: CheckResponda_X_AtividadesRequest) {
        
        const { id_aluno } = request;

        // Buscando se existem conquistas deste tipo
        const conquistas_raw = await this.responda_X_AtividadesRepository.get();
        const conquistas = [...Object.values(conquistas_raw)]

        // Se existirem
        if (conquistas.length > 0) {

            // Verifica o progresso do aluno em cada conquista existente
            const progress = await this.responda_X_AtividadesRepository.checkProgressByAluno({ conquistas, id_aluno });
            return progress;

        } else {
            return 0;
        }

    }
    
}
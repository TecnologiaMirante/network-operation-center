import { Responda_X_AtividadesRepository } from "../../../repositories/interfaces/conquistas/responda_x_atividades/responda_x_atividades-repository";

interface CheckResponda_X_AtividadesRequest {
    id_aluno: string;
    id_disciplina: string;
}

export class CheckResponda_X_AtividadesService {
    
    // Recebendo o repositório
    constructor(
        private responda_X_AtividadesRepository: Responda_X_AtividadesRepository,
    ) {}

    async execute(request: CheckResponda_X_AtividadesRequest) {
        
        const { id_aluno, id_disciplina } = request;

        // Buscando se existem conquistas deste tipo
        const conquistas_raw = await this.responda_X_AtividadesRepository.get({ id_disciplina });
        const conquistas = [...Object.values(conquistas_raw)];

        // Se existirem
        if (conquistas.length > 0) {

            // Verifica o progresso do aluno em cada conquista existente
            const progress = await this.responda_X_AtividadesRepository.checkUnlockedByAluno({ conquistas, id_aluno });
            return progress;

        } else {
            return 0;
        }
    }
}
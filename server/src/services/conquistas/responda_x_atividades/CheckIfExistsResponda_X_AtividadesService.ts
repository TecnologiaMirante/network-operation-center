import { Responda_X_AtividadesRepository } from "../../../repositories/interfaces/conquistas/responda_x_atividades/responda_x_atividades-repository";

interface CheckIfExistsResponda_X_AtividadesRequest {
    id_disciplina: string;
}

export class CheckIfExistsResponda_X_AtividadesService {
    
    // Recebendo o repositório
    constructor(
        private responda_X_AtividadesRepository: Responda_X_AtividadesRepository,
    ) {}

    async execute(request: CheckIfExistsResponda_X_AtividadesRequest) {
    
        const { id_disciplina } = request;
        console.log(id_disciplina)

        // Buscando se existem conquistas deste tipo
        try {
            const conquistas_raw = await this.responda_X_AtividadesRepository.get({ id_disciplina });
            const conquistas = [...Object.values(conquistas_raw)];
    
            return conquistas;
        } catch (err) {
            return new Error("Erro ao buscar as conquistas!");
        }
    }
    
}
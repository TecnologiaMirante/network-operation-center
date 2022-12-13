
export interface AtividadeHasQuestoesCreateData {
    id_questao: string;
    id_atividade: string;
}

export interface AtividadeHasQuestoesFind {
    id: string;
}

export interface AtividadeHasQuestoesFindByQuestao {
    id_atividade: string;
    id_questao: string;
}

export interface AtividadeFindQuestoesByAtividade {
    id_atividade: string;
}

export interface AtividadeUpdateQuestoesGrade {
    id_atividade: string;
}

export interface AtividadeHasQuestoesDelete {
    id: string;
}

export interface AtividadeHasQuestoesDeleteQuestao {
    id: string;
    id_questao: string;
}

export interface AtividadeHasQuestoesDeleteManyByAtividade {
    id_atividade: string;
}

export interface AtividadeHasQuestoesUpdate {
    id: string;
    id_questao?: string;
    id_atividade?: string;
}

export interface AtividadeHasQuestoesRepository {
    create: (data: AtividadeHasQuestoesCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: AtividadeHasQuestoesFind) => Promise<Object | null>;
    findByQuestao: (data: AtividadeHasQuestoesFindByQuestao) => Promise<Object | null>;
    findQuestoesByAtividade: (data: AtividadeFindQuestoesByAtividade) => Promise<Object | null>;
    updateQuestoesGrade: (data: AtividadeUpdateQuestoesGrade) => Promise<void>;
    delete: (data: AtividadeHasQuestoesDelete) => Promise<void>;
    deleteQuestao: (data: AtividadeHasQuestoesDeleteQuestao) => Promise<void>;
    deleteManyByAtividade: (data: AtividadeHasQuestoesDeleteManyByAtividade) => Promise<void>;
    update: (data: AtividadeHasQuestoesUpdate) => Promise<void>;
}
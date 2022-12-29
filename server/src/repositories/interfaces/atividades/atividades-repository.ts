
export interface AtividadeCreateData {
    title: string;
    thumb: string;
    id_disciplina: string;
    id_serie: string;
}

export interface AtividadeFind {
    id: string;
}

export interface AtividadeFindWebView {
    id: string;
}

export interface AtividadeFindEssentialData {
    id: string;
}

export interface AtividadeGetQuestoes {
    id: string;
}

export interface AtividadeGetQuestoesID {
    id: string;
}

export interface AtividadeGetByDisciplinas {
    id_disciplina: string;
}

export interface AtividadeDelete {
    id: string;
}

export interface AtividadeUpdate {
    id: string;
    title?: string;
    thumb?: string;
    id_disciplina?: string;
    id_serie?: string;
}

export interface AtividadesRepository {
    create: (data: AtividadeCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getQuestoes: (data: AtividadeGetQuestoes) => Promise<Object>;
    getQuestoesID: (data: AtividadeGetQuestoesID) => Promise<Object>;
    getByDisciplina: (data: AtividadeGetByDisciplinas) => Promise<Object>;
    findEssentialData: (data: AtividadeFindEssentialData) => Promise<Object | null>;
    find: (data: AtividadeFind) => Promise<Object | null>;
    findWebView: (data: AtividadeFindWebView) => Promise<Object | null>;
    delete: (data: AtividadeDelete) => Promise<void>;
    update: (data: AtividadeUpdate) => Promise<Object>;
}
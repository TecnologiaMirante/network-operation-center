
export interface OpcaoCreateData {
    description: string;
    is_correct: boolean;
    id_questao: string;
}

export interface OpcaoCreateMany {
    data: OpcaoCreateData[];
}

export interface OpcaoFind {
    id: string;
}

export interface OpcaoDelete {
    id: string;
}

export interface OpcaoDeleteMany {
    id_questao: string;
}

export interface OpcaoUpdate {
    id: string;
    description?: string;
    is_correct?: boolean;
    id_questao?: string;
}

export interface OpcoesRepository {
    create: (data: OpcaoCreateData) => Promise<Object>;
    createMany: (data: OpcaoCreateMany) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: OpcaoFind) => Promise<Object | null>;
    delete: (data: OpcaoDelete) => Promise<void>;
    deleteMany: (data: OpcaoDeleteMany) => Promise<void>;
    update: (data: OpcaoUpdate) => Promise<void>;
}
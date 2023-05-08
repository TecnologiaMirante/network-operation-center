
export interface ProgressoCreateData {
    id_aluno: string;
    id_aula: string;
    progress: number;
    id_bimestre: string;
}

export interface ProgressoFind {
    id: string;
}

export interface ProgressoFindByData {
    id_aluno: string;
    id_aula: string;
}

export interface ProgressoDelete {
    id: string;
}

export interface ProgressoUpdate {
    id: string;
    id_aluno?: string;
    id_aula?: string;
    progress?: number;
    id_bimestre?: string;
}

export interface ProgressosRepository {
    create: (data: ProgressoCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: ProgressoFind) => Promise<Object | null>;
    findByData: (data: ProgressoFindByData) => Promise<Object | null>;
    delete: (data: ProgressoDelete) => Promise<void>;
    update: (data: ProgressoUpdate) => Promise<void>;
}
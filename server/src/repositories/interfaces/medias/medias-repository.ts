
export interface MediaCreateData {
    value: number;
    id_aluno: string;
    id_disciplina: string;
    id_bimestre: string;
}

export interface MediaFind {
    id: string;
}

export interface MediaGetByAluno {
    id_aluno: string;
}

export interface MediaDelete {
    id: string;
}

export interface MediaUpdate {
    id: string;
    value?: number;
    id_aluno?: string;
    id_disciplina?: string;
    id_bimestre?: string;
}

export interface MediasRepository {
    create: (data: MediaCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getByAluno: (data: MediaGetByAluno) => Promise<Object>;
    find: (data: MediaFind) => Promise<Object | null>;
    delete: (data: MediaDelete) => Promise<void>;
    update: (data: MediaUpdate) => Promise<void>;
}
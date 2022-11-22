
export interface SerieCreateData {
    name: string;
    id_escola: string;
}

export interface SerieFind {
    id: string;
}

export interface SerieDelete {
    id: string;
}

export interface SerieUpdate {
    id: string;
    name?: string;
    id_escola?: string;
}

export interface SerieGetAlunos {
    id: string;
}

export interface SeriesRepository {
    create: (data: SerieCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: SerieFind) => Promise<Object | null>;
    delete: (data: SerieDelete) => Promise<void>;
    update: (data: SerieUpdate) => Promise<void>;
    getAlunos: (data: SerieGetAlunos) => Promise<Object | null>;
}

export interface SerieHasDisciplinasCreateData {
    id_disciplina: string;
    id_serie: string;
}

export interface SerieHasDisciplinasFind {
    id: string;
}

export interface SerieHasDisciplinasExistsBetweenSerieDisciplina {
    id_disciplina: string;
    id_serie: string;
}

export interface SerieHasDisciplinasDelete {
    id: string;
}

export interface SerieHasDisciplinasUpdate {
    id: string;
    id_disciplina?: string;
    id_serie?: string;
}

export interface SerieHasDisciplinasRepository {
    create: (data: SerieHasDisciplinasCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: SerieHasDisciplinasFind) => Promise<Object | null>;
    findRelation: (data: SerieHasDisciplinasExistsBetweenSerieDisciplina) => Promise<Object | null>;
    delete: (data: SerieHasDisciplinasDelete) => Promise<void>;
    update: (data: SerieHasDisciplinasUpdate) => Promise<void>;
}

export interface FavoritoCreateData {
    id_aluno: string;
    id_aula: string;
}

export interface FavoritoFind {
    id: string;
}

export interface FavoritoFindByAluno {
    id_aluno: string;
}

export interface FavoritoFindByData {
    id_aluno: string;
    id_aula: string;
}

export interface FavoritoDelete {
    id: string;
}

export interface FavoritoUpdate {
    id: string;
    id_aluno?: string;
    id_aula?: string;
}

export interface FavoritosRepository {
    create: (data: FavoritoCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: FavoritoFind) => Promise<Object | null>;
    findByAluno: (data: FavoritoFindByAluno) => Promise<Object | null>;
    findByData: (data: FavoritoFindByData) => Promise<Object | null>;
    delete: (data: FavoritoDelete) => Promise<void>;
    update: (data: FavoritoUpdate) => Promise<void>;
}

export interface AulaCreateData {
    hash: string;
    title: string;
    file: string;
    thumb?: string;
    time: string;
    id_serie: string;
    id_disciplina?: string;
}

export interface AulaFind {
    id: string;
}

export interface AulaFindByHash {
    hash: string;
}

export interface AulaGetBySerie {
    id_serie: string;
}

export interface AulaGetBySerieDisciplina {
    id_serie: string;
    id_disciplina: string;
}

export interface AulaGetBySerieDisciplinaProfessor {
    id_serie: string;
    id_disciplina: string;
}

export interface AulaDelete {
    id: string;
}

export interface AulaUpdate {
    id: string;
    hash?: string;
    title?: string;
    file?: string;
    rating?: number;
    thumb?: string;
    time?: string;
    id_conteudo?: string;
    id_serie?: string;
    id_disciplina?: string;
}

export interface AulaIsInConteudo {
    id: string;
    id_conteudo: string;
}

export interface AulaGetLastAulas {
    id_aluno: string;
}

export interface AulasRepository {
    create: (data: AulaCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: AulaFind) => Promise<Object | null>;
    findByhash: (data: AulaFindByHash) => Promise<Object | null>;
    getBySerie: (data:AulaGetBySerie) => Promise<Object | null>;
    getBySerieDisciplina: (data: AulaGetBySerieDisciplina) => Promise<Object | null>;
    getBySerieDisciplinaProfessor: (data: AulaGetBySerieDisciplinaProfessor) => Promise<Object | null>;
    delete: (data: AulaDelete) => Promise<void>;
    deleteAll: () => Promise<void>;
    update: (data: AulaUpdate) => Promise<void>;
    inConteudo: (data: AulaIsInConteudo) => Promise<void>;
    getLastAulas: (data: AulaGetLastAulas) => Promise<Object>;
}
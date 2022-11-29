
export interface ConteudoCreateData {
    name: string;
    id_disciplina: string;
    id_serie: string;
    id_bimestre: string;
    created_by: string;
    status?: boolean;
}

export interface ConteudoFind {
    id: string;
}

export interface ConteudoFindByAluno {
    id: string;
    id_aluno: string;
}

export interface ConteudoGetByProfessor {
    created_by: string;
}

export interface ConteudoFindBySerieDisciplina {
    id_serie: string;
    id_disciplina: string;
    id: string;
}

export interface ConteudoGetByAlunoDisciplina {
    id_aluno: string;
    id_disciplina: string;
}

export interface ConteudoDelete {
    id: string;
}

export interface ConteudoUpdate {
    id: string;
    name?: string;
    id_disciplina?: string;
    id_serie?: string;
    id_bimestre?: string;
    status?: boolean;
}

export interface ConteudosRepository {
    create: (data: ConteudoCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getByAlunoDisciplina: (data: ConteudoGetByAlunoDisciplina) => Promise<Object>;
    find: (data: ConteudoFind) => Promise<Object | null>;
    findByAluno: (data: ConteudoFindByAluno) => Promise<Object | null>;
    getByProfessor: (data: ConteudoGetByProfessor) => Promise<Object | null>;
    findBySerieDisciplina: (data: ConteudoFindBySerieDisciplina) => Promise<Object | null>;
    delete: (data: ConteudoDelete) => Promise<void>;
    update: (data: ConteudoUpdate) => Promise<Object>;
}
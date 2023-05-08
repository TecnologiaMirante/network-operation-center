export interface AlunoHasConquistasCreateData {
    progress?: number;
    id_aluno: string;
    id_conquista: string;
}

export interface AlunoHasConquistasFind {
    id: string;
}

export interface AlunoHasConquistasGetByAluno {
    id_aluno: string;
}

export interface AlunoHasConquistasDelete {
    id: string;
}

export interface AlunoHasConquistasRelateAllAlunos {
    id_conquista: string;

}

export interface AlunoHasConquistasUpdate {
    id: string;
    progress?: number;
    id_aluno?: string;
    id_conquista?: string;
}

export interface AlunoHasConquistasRepository {
    create: (data: AlunoHasConquistasCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getConquistasByAluno: (data: AlunoHasConquistasGetByAluno) => Promise<Object>;
    find: (data: AlunoHasConquistasFind) => Promise<Object | null>;
    relateAll: (data: AlunoHasConquistasRelateAllAlunos) => Promise<void>;
    delete: (data: AlunoHasConquistasDelete) => Promise<void>;
    update: (data: AlunoHasConquistasUpdate) => Promise<void>;
}
export interface AlunoHasConquistasCreateData {
    name: string;
    progress: string;
    id_aluno: string;
    id_conquista: string;
}

export interface AlunoHasConquistasFind {
    id: string;
}

export interface AlunoHasConquistasDelete {
    id: string;
}

export interface AlunoHasConquistasUpdate {
    id: string;
    name?: string;
    progress?: string;
    id_aluno?: string;
    id_conquista?: string;
}

export interface AlunoHasConquistasRepository {
    create: (data: AlunoHasConquistasCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: AlunoHasConquistasFind) => Promise<Object | null>;
    delete: (data: AlunoHasConquistasDelete) => Promise<void>;
    update: (data: AlunoHasConquistasUpdate) => Promise<void>;
}
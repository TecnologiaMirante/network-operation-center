
export interface AlunoCreateData {
    id_escola_user: string;
    id_turma: string;
}

export interface AlunoFind {
    id: string;
}

export interface AlunoFindByUser {
    id_escola_user: string;
}

export interface AlunoDelete {
    id: string;
}

export interface AlunoUpdate {
    id: string;
    id_escola_user?: string;
    id_turma?: string;
}

export interface AlunosRepository {
    create: (data: AlunoCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: AlunoFind) => Promise<Object | null>;
    findByUser: (data: AlunoFindByUser) => Promise<Object | null>;
    delete: (data: AlunoDelete) => Promise<void>;
    update: (data: AlunoUpdate) => Promise<void>;
}
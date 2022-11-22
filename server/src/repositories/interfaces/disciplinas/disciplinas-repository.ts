export type status_disciplina = "ativo" | "inativo" | "cancelado"

export interface DisciplinaCreateData {
    name: string;
    code: string;
    status: status_disciplina;    
    id_escola: string;
}

export interface DisciplinaFind {
    id: string;
}

export interface DisciplinaGetByAluno {
    id_aluno: string;
}

export interface DisciplinaGetByProfessor {
    id_professor: string;
}

export interface DisciplinaDelete {
    id: string;
}

export interface DisciplinaUpdate {
    id: string;
    name?: string;
    code?: string;
    status?: status_disciplina;
    id_escola?: string;
    icon?: string;
    bk_img?: string;
    bk_color?: string;
}

export interface DisciplinaChangeStatus {
    id: string;
    status: status_disciplina;
}

export interface DisciplinasRepository {
    create: (data: DisciplinaCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: DisciplinaFind) => Promise<Object | null>;
    getByAluno: (data: DisciplinaGetByAluno) => Promise<Object | null>;
    delete: (data: DisciplinaDelete) => Promise<void>;
    update: (data: DisciplinaUpdate) => Promise<void>;
    changeStatus: (data:DisciplinaChangeStatus) => Promise<void>;
}
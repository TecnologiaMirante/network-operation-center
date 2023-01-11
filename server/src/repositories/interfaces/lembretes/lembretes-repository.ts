
export interface LembreteCreateData {
    title: string;
    data: Date;
    start: Date;
    end: Date;
    id_turma?: string;    
    id_disciplina?: string;
    id_aluno?: string;
    id_professor?: string;
}

export interface LembreteFind {
    id: string;
}

export interface LembreteGetByAluno {
    id_aluno: string;
}

export interface LembreteDelete {
    id: string;
}

export interface LembreteUpdate {
    id: string;
    title?: string;
    data?: Date;
    start?: Date;
    end?: Date;
    id_turma?: string;    
    id_disciplina?: string;
    id_aluno?: string;
    id_professor?: string;
}

export interface LembretesRepository {
    create: (data: LembreteCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getByAluno: (data: LembreteGetByAluno) => Promise<Object>;
    find: (data: LembreteFind) => Promise<Object | null>;
    delete: (data: LembreteDelete) => Promise<void>;
    update: (data: LembreteUpdate) => Promise<void>;
}
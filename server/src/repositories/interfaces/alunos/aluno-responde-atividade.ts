
export interface AlunoRespondeAtividadeCreateData {
    nota: number;
    time: number;
    id_atividade: string;
    id_aluno: string;
}

export interface AlunoRespondeAtividadeFind {
    id: string;
}

export interface AlunoRespondeAtividadeFindByDisciplinaAluno {
    id_aluno: string;
}

export interface AlunoRespondeAtividadeDelete {
    id: string;
}

export interface AlunoRespondeAtividadeUpdate {
    id: string;
    nota?: number;
    id_atividade?: string;
    id_aluno?: string;
    id_bimestre?: string;
}

export interface AlunoRespondeAtividadesRepository {
    create: (data: AlunoRespondeAtividadeCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: AlunoRespondeAtividadeFind) => Promise<Object | null>;
    findNotas: (data: AlunoRespondeAtividadeFindByDisciplinaAluno) => Promise<Object | null>;
    delete: (data: AlunoRespondeAtividadeDelete) => Promise<void>;
    update: (data: AlunoRespondeAtividadeUpdate) => Promise<void>;
}
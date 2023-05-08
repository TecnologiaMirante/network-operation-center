
export interface AnotacaoCreateData {
    descricao: string;
    id_aluno: string;
    id_aula?: string;
}

export interface AnotacaoFind {
    id: string;
}

export interface AnotacaoGetByAluno {
    id_aluno: string;
}

export interface AnotacaoDelete {
    id: string;
}

export interface AnotacaoUpdate {
    id: string;
    descricao?: string;
    id_aluno?: string;
    id_aula?: string;
}

export interface AnotacoesRepository {
    create: (data: AnotacaoCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getByAluno: (data: AnotacaoGetByAluno) => Promise<Object>;
    find: (data: AnotacaoFind) => Promise<Object | null>;
    delete: (data: AnotacaoDelete) => Promise<void>;
    update: (data: AnotacaoUpdate) => Promise<Object | null>;
}
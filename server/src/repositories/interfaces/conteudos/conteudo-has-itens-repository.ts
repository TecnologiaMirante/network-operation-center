export interface ConteudoHasItensCreateData {
    type: string;
    id_conteudo: string;
    id_aula?: string;
    id_atividade?: string;
}

export interface ConteudoHasItensFind {
    id: string;
}

export interface ConteudoHasItensDelete {
    id: string;
}

export interface ConteudoHasItensUpdate {
    id: string;
    type: string;
    id_conteudo?: string;
    id_aula?: string;
    id_atividade?: string;
}

export interface ConteudoHasItensDeleteManyData {
    id_conteudo: string;
}

export interface ConteudoHasItensRepository {
    create: (data: ConteudoHasItensCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: ConteudoHasItensFind) => Promise<Object | null>;
    delete: (data: ConteudoHasItensDelete) => Promise<void>;
    deleteMany: (data: ConteudoHasItensDeleteManyData) => Promise<void>;
    update: (data: ConteudoHasItensUpdate) => Promise<void>;
}
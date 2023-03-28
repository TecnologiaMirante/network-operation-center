export interface Array_conteudo_atividades {
    id_conteudo: string;
    id_atividade: string;
}

export interface ConteudoHasAtividadesCreateData {
    id_conteudo: string;
    id_atividade: string;
}

export interface ConteudoHasAtividadesCreateManyData {
    data: Array_conteudo_atividades[];
}

export interface ConteudoHasAtividadesFind {
    id: string;
}

export interface ConteudoHasAtividadesDelete {
    id: string;
}

export interface ConteudoHasAtividadesUpdate {
    id: string;
    id_conteudo?: string;
    id_atividade?: string;
}

export interface ConteudoHasAtividadesDeleteManyData {
    id_conteudo: string;
}

export interface ConteudoHasAtividadesRepository {
    create: (data: ConteudoHasAtividadesCreateData) => Promise<Object>;
    createMany: (data: ConteudoHasAtividadesCreateManyData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: ConteudoHasAtividadesFind) => Promise<Object | null>;
    delete: (data: ConteudoHasAtividadesDelete) => Promise<void>;
    deleteMany: (data: ConteudoHasAtividadesDeleteManyData) => Promise<void>;
    update: (data: ConteudoHasAtividadesUpdate) => Promise<void>;
}
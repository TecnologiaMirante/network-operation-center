
export interface AnotacaoHasTagCreateData {
    id_anotacao: string;
    id_tag: string;
}

export interface AnotacaoHasTagFind {
    id: string;
}

export interface AnotacaoHasTagGetTagsByAnotacao {
    id_anotacao: string;
}

export interface AnotacaoHasTagDelete {
    id: string;
}

export interface AnotacaoHasTagUpdate {
    id: string;
    id_anotacao?: string;
    id_tag?: string;
}
export interface AnotacaoHasTagDeleteAll {
    id_anotacao: string;
}

export interface AnotacaoHasTagsRepository {
    create: (data: AnotacaoHasTagCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getTagsByAnotacao: (data: AnotacaoHasTagGetTagsByAnotacao) => Promise<Object>;
    find: (data: AnotacaoHasTagFind) => Promise<Object | null>;
    delete: (data: AnotacaoHasTagDelete) => Promise<void>;
    deleteAllTagsByAnotacao: (data: AnotacaoHasTagDeleteAll) => Promise<void>;
    update: (data: AnotacaoHasTagUpdate) => Promise<void>;
}
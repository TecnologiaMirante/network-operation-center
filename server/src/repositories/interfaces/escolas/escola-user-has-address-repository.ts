export interface EscolaUserHasAddressCreateData {
    state?: string;
    city?: string;
    district?: string;
    number?: string;
    street?: string;
    address_continued?: string;
    zip_code?: string;
    reference?: string;
    id_user: string;
}

export interface EscolaUserHasAddressFind {
    id_user: string;
}

export interface EscolaUserHasAddressDelete {
    id: string;
}

export interface EscolaUserHasAddressUpdate {
    id: string;
    state?: string;
    city?: string;
    district?: string;
    number?: string;
    street?: string;
    address_continued?: string;
    zip_code?: string;
    reference?: string;
    id_user?: string;
}

export interface EscolaUserHasAddressRepository {
    create: (data: EscolaUserHasAddressCreateData) => Promise<void>;
    get: () => Promise<Object>;
    find: (data: EscolaUserHasAddressFind) => Promise<Object | null>;
    delete: (data: EscolaUserHasAddressDelete) => Promise<void>;
    update: (data: EscolaUserHasAddressUpdate) => Promise<void>;
}
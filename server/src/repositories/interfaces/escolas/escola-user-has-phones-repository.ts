export interface EscolaUserHasPhoneCreateData {
    phone?: string;
    id_user: string;
}

export interface EscolaUserHasPhoneFind {
    id: string;
}

export interface EscolaUserHasPhoneDelete {
    id: string;
}

export interface EscolaUserHasPhoneUpdate {
    id: string;
    phone?: string;
    id_user?: string;
}

export interface EscolaUserHasPhonesRepository {
    create: (data: EscolaUserHasPhoneCreateData) => Promise<void>;
    get: () => Promise<Object>;
    find: (data: EscolaUserHasPhoneFind) => Promise<Object | null>;
    delete: (data: EscolaUserHasPhoneDelete) => Promise<void>;
    update: (data: EscolaUserHasPhoneUpdate) => Promise<void>;
}
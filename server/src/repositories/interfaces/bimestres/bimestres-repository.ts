
export interface BimestreCreateData {
    number: number;
    start: Date;
    end: Date;
}

export interface BimestreFind {
    id: string;
}

export interface BimestreDelete {
    id: string;
}

export interface BimestreUpdate {
    id: string;
    number?: number;
    start?: Date;
    end?: Date;
}

export interface BimestresRepository {
    create: (data: BimestreCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: BimestreFind) => Promise<Object | null>;
    delete: (data: BimestreDelete) => Promise<void>;
    update: (data: BimestreUpdate) => Promise<void>;
}
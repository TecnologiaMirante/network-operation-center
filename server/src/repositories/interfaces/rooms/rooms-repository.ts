
export interface RoomCreateData {
    id_aluno: string;
    id_professor: string;
}

export interface RoomFind {
    id: string;
}

export interface RoomDelete {
    id: string;
}

export interface RoomUpdate {
    id: string;
    id_aluno?: string;
    id_professor?: string;
}

export interface RoomsRepository {
    create: (data: RoomCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: RoomFind) => Promise<Object | null>;
    delete: (data: RoomDelete) => Promise<void>;
    update: (data: RoomUpdate) => Promise<Object | null>;
}
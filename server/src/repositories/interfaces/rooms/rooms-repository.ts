
export interface RoomCreateData {
    id_aluno: string;
    id_socket?: string;
    id_professor: string;
    id_name: string
}

export interface RoomFind {
    id: string;
}

export interface RoomFindByName {
    id_name: string;
}

export interface RoomDelete {
    id: string;
}

export interface RoomUpdate {
    id: string;
    id_aluno?: string;
    id_socket?: string;
    id_professor?: string;
    id_name?: string;
}

export interface RoomUpdateSocket {
    id: string;
    id_socket: string;
}

export interface RoomsRepository {
    create: (data: RoomCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: RoomFind) => Promise<Object | null>;
    findByName: (data: RoomFindByName) => Promise<Object | null>;
    delete: (data: RoomDelete) => Promise<void>;
    update: (data: RoomUpdate) => Promise<Object | null>;
    updateSocket: (data: RoomUpdateSocket) => Promise<Object | null>;
}
export interface UserRoomCreateData {
    id_room: string;
    id_socket: string;
    id_connected: string;
}

export interface UserRoomFind {
    id: string;
}

export interface UserRoomDelete {
    id: string;
}

export interface UserRoomUpdate {
    id: string;
    id_room?: string;
    id_socket?: string;
    id_connected?: string;
}

export interface UserRoomUpdateSocketUserRoom {
    id_room: string;
    id_socket: string;
    id_connected: string;
}

export interface UserRoomAddUser {
    id_room: string;
    id_connected: string;
    id_socket: string;
}

export interface UserRoomUserIsInUserRoom {
    id_room: string;
    id_connected: string;
}

export interface UserRoomsRepository {
    create: (data: UserRoomCreateData) => Promise<Object | null >;
    get: () => Promise<Object>;
    find: (data: UserRoomFind) => Promise<Object | null>;
    delete: (data: UserRoomDelete) => Promise<void>;
    update: (data: UserRoomUpdate) => Promise<Object | null>;
    updateSocketUserRoom: (data: UserRoomUpdateSocketUserRoom) => Promise<Object | null>;
    addUser: (data: UserRoomAddUser) => Promise<Object | null>;
    isInUserRoom: (data: UserRoomUserIsInUserRoom) => Promise<Object | null>;
}
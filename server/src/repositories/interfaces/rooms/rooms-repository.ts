
export interface RoomCreateData {
    id_aluno: string;
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

// export interface RoomUpdateSocketRoom {
//     id: string;
//     id_socket: string;
//     id_connected: string;
// }

// export interface RoomAddUser {
//     id: string;
//     id_connected: string;
//     id_socket: string;
// }

// export interface RoomUserIsInRoom {
//     id: string;
//     id_connected: string;
// }

export interface RoomGetOpenRooms {
    id_professor: string;
}

export interface RoomsRepository {
    create: (data: RoomCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: RoomFind) => Promise<Object | null>;
    findByName: (data: RoomFindByName) => Promise<Object | null>;
    delete: (data: RoomDelete) => Promise<void>;
    update: (data: RoomUpdate) => Promise<Object | null>;
    getOpenRooms: (data: RoomGetOpenRooms) => Promise<Object>;
    // updateSocketRoom: (data: RoomUpdateSocketRoom) => Promise<Object | null>;
    // addUser: (data: RoomAddUser) => Promise<Object | null>;
    // userIsInRoom: (data: RoomUserIsInRoom) => Promise<Object | null>;
}
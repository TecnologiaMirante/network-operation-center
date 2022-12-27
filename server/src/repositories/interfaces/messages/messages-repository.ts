
export interface MessageCreateData {
    id_room: string;
    id_user: string;
    text: string;
}

export interface MessageFind {
    id: string;
}

export interface GetMessagesByRoom {
    id_room: string;
}

export interface MessageDelete {
    id: string;
}

export interface MessageUpdate {
    id: string;
    id_room?: string;
    id_user?: string;
    text?: string;
}

export interface MessagesRepository {
    create: (data: MessageCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getMessagesByRoom: (data: GetMessagesByRoom) => Promise<Object>;
    find: (data: MessageFind) => Promise<Object | null>;
    delete: (data: MessageDelete) => Promise<void>;
    update: (data: MessageUpdate) => Promise<Object | null>;
}
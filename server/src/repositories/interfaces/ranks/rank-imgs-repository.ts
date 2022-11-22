
export interface RankImgCreateData {
    first?: string;
    second?: string;
    third?: string;
}

export interface RankImgDelete {
    id: string;
}

export interface RankImgUpdate {
    id: string;
    first?: string;
    second?: string;
    third?: string;
}

export interface RankImgsRepository {
    create: (data: RankImgCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    delete: (data: RankImgDelete) => Promise<void>;
    update: (data: RankImgUpdate) => Promise<void>;
}
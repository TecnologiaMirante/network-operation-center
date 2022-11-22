
export interface RankCreateData {
    id_aluno: string;
    points: number;
}

export interface GetRankByAluno {
    id_aluno: string;
}

export interface RankDelete {
    id: string;
}

export interface RankUpdate {
    id: string;
    id_aluno?: string;
    points?: number;
}

export interface RanksRepository {
    create: (data: RankCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getByAluno: (data: GetRankByAluno) => Promise<Object | null>;
    delete: (data: RankDelete) => Promise<void>;
    update: (data: RankUpdate) => Promise<void>;
}
export type status_turma = "ativo" | "inativo" | "cancelado"
export type shift_turma = "integral" | "matutino" | "vespertino" | "noturno"
export interface TurmaCreateData {
    name: string;
    code: string;
    shift: shift_turma;
    year: string;
    status: status_turma;
    id_serie: string;
}

export interface TurmaFind {
    id: string;
}

export interface TurmaDelete {
    id: string;
}

export interface TurmaUpdate {
    id: string;
    name?: string;
    code?: string;
    shift?: shift_turma;
    year?: string;
    status?: status_turma;
    id_serie?: string;
}

export interface TurmaGetSerieByTurma {
    id: string;
}

export interface TurmasRepository {
    create: (data: TurmaCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getSerieByTurma: (data: TurmaGetSerieByTurma) => Promise<Object | null>;
    find: (data: TurmaFind) => Promise<Object | null>;
    delete: (data: TurmaDelete) => Promise<void>;
    update: (data: TurmaUpdate) => Promise<void>;
}
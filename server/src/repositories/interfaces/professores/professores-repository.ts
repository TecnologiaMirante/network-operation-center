
export interface ProfessorCreateData {
    education: string;
    experience: string;
    description: string;

    id_escola_user: string;
}

export interface ProfessorFind {
    id: string;
}

export interface ProfessorDelete {
    id: string;
}

export interface ProfessorUpdate {
    id: string;
    education?: string;
    experience?: string;
    description?: string;
    id_escola_user?: string;
}

export interface ProfessoresRepository {
    create: (data: ProfessorCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: ProfessorFind) => Promise<Object | null>;
    delete: (data: ProfessorDelete) => Promise<void>;
    update: (data: ProfessorUpdate) => Promise<void>;
}
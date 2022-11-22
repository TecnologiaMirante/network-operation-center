
export interface ProfessorHasDisciplinaCreateData {
    id_professor: string;
    id_disciplina: string;
}

export interface ProfessorHasDisciplinaFind {
    id: string;
}

export interface ProfessorHasDisciplinaDelete {
    id: string;
}

export interface ProfessorHasDisciplinaGetDisciplinasByProfessor {
    id_professor: string;
}

export interface ProfessorHasDisciplinaUpdate {
    id: string;
    id_professor?: string;
    id_disciplina?: string;
}

export interface ProfessorHasDisciplinasRepository {
    create: (data: ProfessorHasDisciplinaCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getDisciplinasByProfessor: (data: ProfessorHasDisciplinaGetDisciplinasByProfessor) => Promise<Object>;
    find: (data: ProfessorHasDisciplinaFind) => Promise<Object | null>;
    delete: (data: ProfessorHasDisciplinaDelete) => Promise<void>;
    update: (data: ProfessorHasDisciplinaUpdate) => Promise<void>;
}
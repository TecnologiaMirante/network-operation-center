
export interface ProfessorHasDisciplinaTurmaCreateData {
    id_professor_has_disciplinas: string;
    id_turma: string;
}

export interface ProfessorHasDisciplinaTurmaFind {
    id: string;
}

export interface ProfessorHasDisciplinaTurmaDelete {
    id: string;
}

export interface ProfessorHasDisciplinaTurmaGetSeriesByProfessor {
    id_professor: string;
}

export interface ProfessorHasDisciplinaTurmaUpdate {
    id: string;
    id_professor_has_disciplinas?: string;
    id_turma?: string;
}

export interface ProfessorHasDisciplinaTurmasRepository {
    create: (data: ProfessorHasDisciplinaTurmaCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    getSeriesByProfessor: (data: ProfessorHasDisciplinaTurmaGetSeriesByProfessor) => Promise<Object>;
    find: (data: ProfessorHasDisciplinaTurmaFind) => Promise<Object | null>;
    delete: (data: ProfessorHasDisciplinaTurmaDelete) => Promise<void>;
    update: (data: ProfessorHasDisciplinaTurmaUpdate) => Promise<void>;
}
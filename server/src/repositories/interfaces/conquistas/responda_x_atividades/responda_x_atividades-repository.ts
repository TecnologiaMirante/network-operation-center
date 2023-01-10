export interface Conquista {
    id: string;
    name: string;
    description: string;
    type: string;
    domain: string;
    objective: number;
    objective_secondary: number;
    id_disciplina: string;
    difficulty: string;
}

export interface Responda_X_AtividadesGetByAluno {
    id_aluno: string;
}

export interface Responda_X_AtividadesGet {
    id_disciplina: string;
}

export interface Responda_X_AtividadesCheckUnlockedByAluno {
    conquistas: Conquista[]
    id_aluno: string;
}

export interface Responda_X_AtividadesUpdateProgress {
    conquistas: Conquista[]
    id_aluno: string;
}

export interface Responda_X_AtividadesRepository {
    get: (data: Responda_X_AtividadesGet) => Promise<Object>;
    getByAluno: (data: Responda_X_AtividadesGetByAluno) => Promise<Object>;
    checkUnlockedByAluno: (data: Responda_X_AtividadesCheckUnlockedByAluno) => Promise<Object>;
    updateProgressByAluno: (data: Responda_X_AtividadesUpdateProgress) => Promise<void>;
}
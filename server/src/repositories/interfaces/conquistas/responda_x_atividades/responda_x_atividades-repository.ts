export interface ConquistasId {
    id_conquista: string;
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

export interface Responda_X_AtividadesCheckProgressByAluno {
    conquistas: ConquistasId[]
    id_aluno: string;
}


export interface Responda_X_AtividadesRepository {
    get: () => Promise<Object>;
    getByAluno: (data: Responda_X_AtividadesGetByAluno) => Promise<Object>;
    checkProgressByAluno: (data: Responda_X_AtividadesCheckProgressByAluno) => Promise<Object>;
}
export type conquistas_type = "ALCANCE_MEDIA_X" | "RESPONDA_X_ATIVIDADE" | "NOTA_X_EM_Y_ATIVIDADES" | "ASSISTA_X_MINUTOS_DE_AULA" | "MAIOR_PONTUACAO_NA_X_AO_FIM_DO_BIMESTRE" | "X_DIAS_SEGUIDOS_NO_APLICATIVO";
export type conquistas_difficulty = "easy" | "normal" | "hard"
export type conquistas_domain = "specific" | "general"

export interface ConquistaCreateData {
    name: string;
    description: string;
    color: string;
    icon: string;
    type: conquistas_type;
    domain: conquistas_domain;
    objective: number;
    objective_secondary?: number;
    id_disciplina?: string;
    difficulty: conquistas_difficulty;
}

export interface ConquistaCreateSpecific {
    name: string;
    description: string;
    color: string;
    icon: string;
    type: conquistas_type;
    domain: conquistas_domain;
    objective: number;
    objective_secondary?: number;
    id_disciplina?: string;
    difficulty: conquistas_difficulty;
}

export interface ConquistaCreateGeneral {
    name: string;
    description: string;
    color: string;
    icon: string;
    type: conquistas_type;
    domain: conquistas_domain;
    objective: number;
    objective_secondary?: number;
    id_disciplina?: string;
    difficulty: conquistas_difficulty;
}

export interface ConquistaFind {
    id: string;
}


export interface ConquistaDelete {
    id: string;
}

export interface ConquistaUpdate {
    id: string;
    name?: string;
    description?: string;
    color?: string;
    icon?: string;
    type?: conquistas_type;
    domain?: conquistas_domain;
    objective?: number;
    objective_secondary?: number;
    id_disciplina?: string;
    difficulty?: conquistas_difficulty;
}

export interface ConquistasRepository {
    create: (data: ConquistaCreateData) => Promise<Object>;
    createSpecific: (data: ConquistaCreateSpecific) => Promise<Object>;
    createGeneral: (data: ConquistaCreateGeneral) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: ConquistaFind) => Promise<Object | null>;
    delete: (data: ConquistaDelete) => Promise<void>;
    update: (data: ConquistaUpdate) => Promise<Object | null>;
}
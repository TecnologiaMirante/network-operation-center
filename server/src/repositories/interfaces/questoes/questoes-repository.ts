export type questao_difficulty = "easy" | "normal" | "hard" | "very_hard"

export interface QuestaoCreateData {
    title: string;
    question_type: string;
    grade: number;
    difficulty: questao_difficulty;
    id_disciplina: string;
}

export interface QuestaoFind {
    id: string;
}

export interface QuestaoDelete {
    id: string;
}

export interface QuestaoUpdate {
    id: string;
    title?: string;
    question_type?: string;
    grade?: number;
    difficulty?: questao_difficulty;
    id_disciplina?: string;
}

export interface QuestoesRepository {
    create: (data: QuestaoCreateData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: QuestaoFind) => Promise<Object | null>;
    delete: (data: QuestaoDelete) => Promise<void>;
    update: (data: QuestaoUpdate) => Promise<void>;
}
// export interface DadosCreateData {
//     name: string;
//     code: string;
//     id_escola: string;
// }

// export interface DadosFind {
//     id: string;
// }

// export interface DadosGetByAluno {
//     id_aluno: string;
// }

export interface DadosGetByProfessor {
    id_disciplina: string;
    id_turma: string;
    id_aluno: string;
}

// export interface DadosDelete {
//     id: string;
// }

// export interface DadosUpdate {
//     id: string;
//     name?: string;
//     code?: string;
//     id_escola?: string;
//     icon?: string;
//     bk_img?: string;
//     bk_color?: string;
// }

export interface DadosRepository {
    // create: (data: DadosCreateData) => Promise<Object>;
    // get: () => Promise<Object>;
    // find: (data: DadosFind) => Promise<Object | null>;
    getByProfessor: (data: DadosGetByProfessor) => Promise<Object>;
    // delete: (data: DadosDelete) => Promise<void>;
    // update: (data: DadosUpdate) => Promise<void>;
}
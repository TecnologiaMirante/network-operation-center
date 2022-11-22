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

export interface DadosDropdownGetByProfessor {
    id_professor: string;
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

export interface DadosDropdownRepository {
    // create: (data: DadosCreateData) => Promise<Object>;
    // get: () => Promise<Object>;
    // find: (data: DadosFind) => Promise<Object | null>;
    dropdownGetByProfessor: (data: DadosDropdownGetByProfessor) => Promise<Object>;
    // delete: (data: DadosDelete) => Promise<void>;
    // update: (data: DadosUpdate) => Promise<void>;
}
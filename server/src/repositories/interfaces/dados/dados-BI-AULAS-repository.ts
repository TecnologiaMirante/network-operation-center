export interface DadosBIAulas {
    id_professor: string;
}

export interface DadosBIAulasRepository {
    // create: (data: DadosCreateData) => Promise<Object>;
    // get: () => Promise<Object>;
    // find: (data: DadosFind) => Promise<Object | null>;
    BIAulas: (data: DadosBIAulas) => Promise<Object>;
    // delete: (data: DadosDelete) => Promise<void>;
    // update: (data: DadosUpdate) => Promise<void>;
}
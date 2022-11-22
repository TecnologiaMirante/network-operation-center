export interface DadosBIAtividades {
    id_professor: string;
}

export interface DadosBIAtividadesRepository {
    // create: (data: DadosCreateData) => Promise<Object>;
    // get: () => Promise<Object>;
    // find: (data: DadosFind) => Promise<Object | null>;
    BIAtividades: (data: DadosBIAtividades) => Promise<Object>;
    // delete: (data: DadosDelete) => Promise<void>;
    // update: (data: DadosUpdate) => Promise<void>;
}
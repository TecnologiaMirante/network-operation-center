import { Array_conteudo_aula } from "../../../services/conteudos/conteudo-has-aulas/CreateConteudoHasAulasService";

export interface ConteudoHasAulasCreateData {
    id_conteudo: string;
    id_aula: string;
}

export interface ConteudoHasAulasCreateManyData {
    data: Array_conteudo_aula[];
}

export interface ConteudoHasAulasFind {
    id: string;
}

export interface ConteudoHasAulasDelete {
    id: string;
}

export interface ConteudoHasAulasUpdate {
    id: string;
    id_conteudo?: string;
    id_aula?: string;
}

export interface ConteudoHasAulasDeleteManyData {
    id_conteudo: string;
}

export interface ConteudoHasAulasRepository {
    create: (data: ConteudoHasAulasCreateData) => Promise<Object>;
    createMany: (data: ConteudoHasAulasCreateManyData) => Promise<Object>;
    get: () => Promise<Object>;
    find: (data: ConteudoHasAulasFind) => Promise<Object | null>;
    delete: (data: ConteudoHasAulasDelete) => Promise<void>;
    deleteMany: (data: ConteudoHasAulasDeleteManyData) => Promise<void>;
    update: (data: ConteudoHasAulasUpdate) => Promise<void>;
}
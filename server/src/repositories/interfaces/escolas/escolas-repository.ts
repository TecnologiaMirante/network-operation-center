export type school_type = "municipal" | "estadual" | "privada"

export interface EscolaCreateData {
  name: string;
  school_type: school_type;
  id_secretaria?: string;
}

export interface EscolaFind {
  id: string;
}

export interface EscolaDelete {
  id: string;
}

export interface EscolaUpdate {
  id: string;
  name?: string;
  school_type?: school_type;
  id_secretaria?: string;
}

export interface EscolasRepository {
  create: (data: EscolaCreateData) => Promise<Object>;
  get: () => Promise<Object>;
  find: (data: EscolaFind) => Promise<Object | null>;
  delete: (data: EscolaDelete) => Promise<void>;
  update: (data: EscolaUpdate) => Promise<void>;
}
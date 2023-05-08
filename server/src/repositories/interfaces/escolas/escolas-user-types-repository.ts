export interface EscolaUserTypeCreateData {
  name: string;
}

export interface EscolaUserTypeFind {
  id: string;
}

export interface EscolaUserTypeDelete {
  id: string;
}

export interface EscolaUserTypeUpdate {
  id: string;
  name?: string;
}

export interface EscolaUserTypesRepository {
  create: (data: EscolaUserTypeCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: EscolaUserTypeFind) => Promise<Object | null>;
  delete: (data: EscolaUserTypeDelete) => Promise<void>;
  update: (data: EscolaUserTypeUpdate) => Promise<void>;
}
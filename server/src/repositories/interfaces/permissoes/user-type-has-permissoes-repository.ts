export interface Type_has_permissoesCreateData {
  id_type: string;
  id_permissao: string;
}

export interface Type_has_permissoesFind {
  id: string;
}

export interface Type_has_permissoesDelete {
  id: string;
}

export interface Type_has_permissoesUpdate {
  id: string;
  id_type?: string;
  id_permissao?: string;
}

export interface Type_has_permissoesRepository {
  create: (data: Type_has_permissoesCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: Type_has_permissoesFind) => Promise<Object | null>;
  delete: (data: Type_has_permissoesDelete) => Promise<void>;
  update: (data: Type_has_permissoesUpdate) => Promise<void>;
}
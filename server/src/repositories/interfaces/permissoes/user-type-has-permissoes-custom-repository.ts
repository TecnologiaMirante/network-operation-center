export interface Type_has_permissoesCustomCreateData {
  id_type: string;
  id_permissao: string;
  id_escola_user: string;
}

export interface Type_has_permissoesCustomFind {
  id: string;
}

export interface Type_has_permissoesCustomDelete {
  id: string;
}

export interface Type_has_permissoesCustomUpdate {
  id: string;
  id_type?: string;
  id_permissao?: string;
  id_escola_user?: string;
}

export interface Type_has_permissoesCustomRepository {
  create: (data: Type_has_permissoesCustomCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: Type_has_permissoesCustomFind) => Promise<Object | null>;
  delete: (data: Type_has_permissoesCustomDelete) => Promise<void>;
  update: (data: Type_has_permissoesCustomUpdate) => Promise<void>;
}
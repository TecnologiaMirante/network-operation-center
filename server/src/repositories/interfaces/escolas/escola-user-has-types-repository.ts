export interface EscolaUserHasTypeCreateData {
  id_escola_user: string;
  id_type: string;
}

export interface EscolaUserHasTypeFind {
  id: string;
}

export interface EscolaUserHasTypeFindByUser {
  id_escola_user: string;
}

export interface EscolaUserHasTypeDelete {
  id: string;
}

export interface EscolaUserHasTypeUpdate {
  id: string;
  id_escola_user?: string;
  id_type?: string;
}

export interface EscolaUserHasTypesRepository {
  create: (data: EscolaUserHasTypeCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: EscolaUserHasTypeFind) => Promise<Object | null>;
  findByUser: (data: EscolaUserHasTypeFindByUser) => Promise<Object | null>;
  delete: (data: EscolaUserHasTypeDelete) => Promise<void>;
  update: (data: EscolaUserHasTypeUpdate) => Promise<void>;
}
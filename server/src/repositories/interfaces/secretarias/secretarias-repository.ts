export interface SecretariaCreateData {
  name: string;
}

export interface SecretariaFind {
  id: string;
}

export interface SecretariaDelete {
  id: string;
}

export interface SecretariaUpdate {
  id: string;
  name: string;
}

export interface SecretariasRepository {
  create: (data: SecretariaCreateData) => Promise<Object>;
  get: () => Promise<Object>;
  find: (data: SecretariaFind) => Promise<Object | null>;
  delete: (data: SecretariaDelete) => Promise<void>;
  update: (data: SecretariaUpdate) => Promise<void>;
}
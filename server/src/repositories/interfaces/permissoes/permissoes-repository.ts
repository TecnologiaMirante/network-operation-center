export interface PermissaoCreateData {
  description: string;
}

export interface PermissaoFind {
  id: string;
}

export interface PermissaoDelete {
  id: string;
}

export interface PermissaoUpdate {
  id: string;
  description: string;
}

export interface PermissoesRepository {
  create: (data: PermissaoCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: PermissaoFind) => Promise<Object | null>;
  delete: (data: PermissaoDelete) => Promise<void>;
  update: (data: PermissaoUpdate) => Promise<void>;
}
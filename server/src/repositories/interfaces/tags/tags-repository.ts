export interface TagCreateData {
  name: string;
}

export interface TagFind {
  id: string;
}

export interface TagFindByName {
  name: string;
}

export interface TagDelete {
  id: string;
}

export interface TagUpdate {
  id: string;
  name?: string;
}

export interface TagsRepository {
  create: (data: TagCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: TagFind) => Promise<Object | null>;
  findByName: (data: TagFindByName) => Promise<Object | null>;
  delete: (data: TagDelete) => Promise<void>;
  update: (data: TagUpdate) => Promise<void>;
}
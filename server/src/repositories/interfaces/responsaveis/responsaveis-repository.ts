export interface ResponsavelCreateData {
  name: string;
  email: string;
  password: string;
  cpf: string;
  phone?: string;
}

export interface ResponsavelFind {
  id: string;
}

export interface ResponsavelfindUserWithExistentName {
  name: string;
}

export interface ResponsavelfindUserWithExistentEmail {
  email: string;
}

export interface ResponsavelfindUserWithExistentCPF {
  cpf: string;
}

export interface ResponsavelDelete {
  id: string;
}

export interface ResponsavelUpdate {
  id: string;
  name?: string;
  email?: string;
  password?: string;
  cpf?: string;
  phone?: string;
}

export interface SendToken {
  id: string;
  token: string;
  expiresIn: Date;
}

export interface UpdatePassword {
  id: string;
  password: string;
}

export interface ResponsaveisRepository {
  create: (data: ResponsavelCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: ResponsavelFind) => Promise<Object | null>;
  findUserWithExistentName: (data: ResponsavelfindUserWithExistentName) => Promise<Object | null>;
  findUserWithExistentEmail: (data: ResponsavelfindUserWithExistentEmail) => Promise<Object | null>;
  findUserWithExistentCPF: (data: ResponsavelfindUserWithExistentCPF) => Promise<Object | null>;
  delete: (data: ResponsavelDelete) => Promise<void>;
  update: (data: ResponsavelUpdate) => Promise<void>;
  sendToken: (data: SendToken) => Promise<void>;
  updatePassword: (data: UpdatePassword) => Promise<void>;
}
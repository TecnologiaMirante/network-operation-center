export interface SecretariaUserCreateData {
  name: string;
  email: string;
  password: string;
  mat: string;
  id_secretaria: string;
}

export interface SecretariaUserFind {
  id: string;
}
export interface SecretariaUserLoginData {
  id: string;
}
export interface SecretariaUserfindUserWithExistentEmail {
  email: string;
}

export interface SecreatariaUserfindUserWithExistentMat {
  mat: string;
}

export interface SendToken {
  id: string;
  token: string;
  expiresIn: Date;
}

export interface SecretariaUserDelete {
  id: string;
}

export interface SecretariaUserUpdate {
  id: string;
  name?: string;
  email?: string;
  id_secretaria?: string;
}

export interface UpdatePassword {
  id: string;
  password: string;
}

export interface SecretariaUsersRepository {
  create: (data: SecretariaUserCreateData) => Promise<void>;
  get: () => Promise<Object>;
  find: (data: SecretariaUserFind) => Promise<Object | null>;
  findLoginData: (data: SecretariaUserLoginData) => Promise<Object | null>;
  findUserWithExistentEmail: (data: SecretariaUserfindUserWithExistentEmail) => Promise<Object | null>;
  findUserWithExistentMat: (data: SecreatariaUserfindUserWithExistentMat) => Promise<Object | null>;
  sendToken: (data: SendToken) => Promise<void>;
  updatePassword: (data: UpdatePassword) => Promise<void>;
  delete: (data: SecretariaUserDelete) => Promise<void>;
  update: (data: SecretariaUserUpdate) => Promise<void>;
}
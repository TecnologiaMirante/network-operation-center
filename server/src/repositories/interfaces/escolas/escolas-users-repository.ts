export interface EscolaUserCreateData {
  name: string;
  email?: string;
  password: string;
  cpf?: string;
  mat?: string;
  born?: string;
  genre?: string;
  avatar?: string;
  id_responsavel?: string;
  id_escola?: string;
}

export interface EscolaUserFind {
  id: string;
}

export interface AlunoEscolaUserLoginData {
  id: string;
}

export interface ProfessorEscolaUserLoginData {
  id: string;
}

export interface EscolaUserfindUserWithExistentName {
  name: string;
}

export interface EscolaUserfindUserWithExistentEmail {
  email: string;
}

export interface EscolaUserfindUserWithExistentCPF {
  cpf: string;
}

export interface EscolaUserfindUserWithExistentMat {
  mat: string;
}

export interface EscolaUserDelete {
  id: string;
}

export interface EscolaUserUpdate {
  id: string;
  name?: string;
  email?: string;
  cpf?: string;
  mat?: string;
  born?: string;
  genre?: string;
  avatar?: string;
  id_responsavel?: string;
  id_escola?: string;
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

export interface EscolaUserAuthenticate {
  id: string;
  status: boolean;
}

export interface EscolaUserIsAuthenticated {
  id: string;
}

export interface EscolaUserChangePassword {
  id_user: string;
  new_password: string;
}
 
export interface EscolaUsersRepository {
  create: (data: EscolaUserCreateData) => Promise<Object | null>;
  get: () => Promise<Object>;
  find: (data: EscolaUserFind) => Promise<Object | null>;
  findAlunoLoginData: (data: AlunoEscolaUserLoginData) => Promise<Object | null>;
  findProfessorLoginData: (data: ProfessorEscolaUserLoginData) => Promise<Object | null>;
  findUserWithExistentName: (data: EscolaUserfindUserWithExistentName) => Promise<Object | null>;
  findUserWithExistentEmail: (data: EscolaUserfindUserWithExistentEmail) => Promise<Object | null>;
  findUserWithExistentCPF: (data: EscolaUserfindUserWithExistentCPF) => Promise<Object | null>;
  findUserWithExistentMat: (data: EscolaUserfindUserWithExistentMat) => Promise<Object | null>;
  authenticate: (data: EscolaUserAuthenticate) => Promise<void>;
  isAuthenticated: (data: EscolaUserIsAuthenticated) => Promise<Object | null>;
  changePassword: (data: EscolaUserChangePassword) => Promise<void>;
  delete: (data: EscolaUserDelete) => Promise<void>;
  update: (data: EscolaUserUpdate) => Promise<void>;
  sendToken: (data: SendToken) => Promise<void>;
  updatePassword: (data: UpdatePassword) => Promise<void>;
}
import { compare } from "bcryptjs";
import { hash } from "bcryptjs";
import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";

// Interface do FindEscolas
interface ChangePasswordRequest {
  actual_password: string;
  new_password: string;
  id_user: string;
}

// Service
export class ChangePasswordService {
  
  // Recebendo o repositório do usuário no construtor
  constructor(
    private escolaUsersRepository: EscolaUsersRepository,
  ) {}

  // Executando o service
  async execute({ actual_password, new_password, id_user }: ChangePasswordRequest) {

    // Buscando 
    const escolaUser = await this.escolaUsersRepository.find({ id: id_user });

    // Caso não existam EscolaUsers no sistema, retorna erro
    if (!escolaUser) {
      return new Error("Nenhum usuário cadastrado!")
    } 

    // // Se a senha inserida é igual a cadastrada
    // if (!await compare(actual_password, Object(escolaUser).password)) {
    //   return new Error("Senha atual inválida!")
    // }

    // Gera a nova senha criptografada
    const passwordHash = await hash(new_password, 8);

    // Se der tudo certo, altera os dados encontrados
    return await this.escolaUsersRepository.changePassword({ id_user, new_password });
    // return await this.escolaUsersRepository.changePassword({ id_user, new_password: passwordHash });
  }
}
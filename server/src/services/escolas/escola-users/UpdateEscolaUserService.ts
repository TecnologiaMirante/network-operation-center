import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";
import { EscolasRepository } from "../../../repositories/interfaces/escolas/escolas-repository";

interface UpdateEscolaUserRequest {
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

export class UpdateEscolaUserService {

  // Recebendo o repositório no construtor
  constructor(
    private escolaUsersRepository: EscolaUsersRepository,
    private escolasRepository: EscolasRepository,
  ) {}

  // Executando o service
    async execute(request: UpdateEscolaUserRequest) {

      // Dados do service
      const { id, name, email, cpf, mat, born, genre, avatar, id_responsavel, id_escola } = request;

      // Se o usuário inserir email
      if (email) {
        // Verificando se o email já foi utilizado para cadastro
        if(await this.escolaUsersRepository.findUserWithExistentEmail({email})){
          return new Error("Email já cadastrado!")
        }
      }

      // Se o usuário inserir cpf
      if (cpf) {
        // Verificando se o CPF já foi utilizado para cadastro
        if(await this.escolaUsersRepository.findUserWithExistentCPF({cpf})){
          return new Error("CPF já cadastrado!")
        }
      }

      // Se o usuário inserir Matrícula
      if (mat) {
        // Verificando se a Matrícula já foi utilizada para cadastro
        if(await this.escolaUsersRepository.findUserWithExistentMat({mat})){
          return new Error("Matrícula já cadastrada!")
        }
      }

      // Se o usuário inserir algum id de escola, verifica se ela existe
      if (id_escola) {
        // Verificando se a escola existe
        if(!(await this.escolasRepository.find({id: id_escola}))){
          return new Error("Escola inexistente!");
        }
      }

      // Criando a Escola...
      await this.escolaUsersRepository.update({
        id,
        name, 
        email,
        cpf,
        mat,
        born,
        genre,
        avatar,
        id_responsavel,
        id_escola
      });
    }
}
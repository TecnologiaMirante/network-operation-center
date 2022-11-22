import { hash } from "bcryptjs";
import { EscolaUsersRepository } from "../../repositories/interfaces/escolas/escolas-users-repository";
import { ResponsaveisRepository } from "../../repositories/interfaces/responsaveis/responsaveis-repository";

interface UpdateResponsavelRequest {
  id: string;
  name?: string;
  email?: string;
  cpf?: string;
  phone?: string;
}

export class UpdateResponsavelService {

  // Recebendo o repositório no construtor
  constructor(
    private escolaUsersRepository: EscolaUsersRepository,
    private responsaveisRepository: ResponsaveisRepository,
  ) {}

  // Executando o service
    async execute(request: UpdateResponsavelRequest) {

      // Dados do service
      const { id, name, email, cpf, phone } = request;

      // Verificando se o id existe
      if(!(await this.responsaveisRepository.find({id}))) {
        return new Error("Responsável inexistente!")
      }

      if (email) {
        // Verificando se o email já foi utilizado para cadastro de algum usuário
        if(await this.escolaUsersRepository.findUserWithExistentEmail({email})){
          return new Error("Email já cadastrado!")
        }

        // Verificando se o email já foi utilizado para cadastro de algum responsavel
        if(await this.responsaveisRepository.findUserWithExistentEmail({email})){
          return new Error("Email já cadastrado!")
        }
      }

      if (cpf) {
        
        // Verificando se o CPF já foi utilizado para cadastro
        if(await this.escolaUsersRepository.findUserWithExistentCPF({cpf})){
          return new Error("CPF já cadastrado!")
        }

        // Verificando se o CPF já foi utilizado para cadastro
        if(await this.responsaveisRepository.findUserWithExistentCPF({cpf})){
          return new Error("CPF já cadastrado!")
        }
      }


      // Criando o responsável...
      return await this.responsaveisRepository.update({
        id,
        name, 
        email,
        cpf,
        phone
      });
    }
}
import { hash } from "bcryptjs";
import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";

interface ResetPasswordEscolaUserRequest {
  email: string;
  token: string;
  password: string;
}

export class ResetPasswordEscolaUserService {
    
    // Recebendo os repositórios no construtor
    constructor(
        private escolaUsersRepository: EscolaUsersRepository,
    ) {}

    // Service
    async execute(request: ResetPasswordEscolaUserRequest) {

        const { email, token, password } = request;

        // Verificando se o usuário existe
        const user = await this.escolaUsersRepository.findUserWithExistentEmail({email});

        // Se o usuário não existir, envia um erro
        if (!user) {
            return new Error("Usuário inexistente!");
        }

        // Se o token tiver incorreto
        if (token !== Object(user).passwordResetToken) {
            return new Error("Token inválido!");
        }

        const now = new Date();

        // Se o token tiver expirado
        if (now > Object(user).passwordResetExpires) {
            return new Error("Token expirado, gere um novo!");
        }

        // Gera a nova senha criptografada
        const passwordHash = await hash(password, 8);

        // Atualiza a senha
        return await this.escolaUsersRepository.updatePassword({id: Object(user).id, password: passwordHash})
    }
}
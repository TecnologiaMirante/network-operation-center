import { hash } from "bcryptjs";
import { SecretariaUsersRepository } from "../../../repositories/interfaces/secretarias/secretaria-users-repository";

interface ResetPasswordRequest {
  email: string;
  token: string;
  password: string;
}

export class ResetPasswordService {
    
    // Recebendo os repositórios no construtor
    constructor(
        private secretariasUsersRepository: SecretariaUsersRepository,
    ) {}

    // Service
    async execute(request: ResetPasswordRequest) {

        const { email, token, password } = request;

        // Verificando se o usuário existe
        const user = await this.secretariasUsersRepository.findUserWithExistentEmail({email});

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
        return await this.secretariasUsersRepository.updatePassword({id: Object(user).id, password: passwordHash})
    }
}
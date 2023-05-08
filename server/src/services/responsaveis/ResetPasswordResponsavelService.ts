import { hash } from "bcryptjs";
import { ResponsaveisRepository } from "../../repositories/interfaces/responsaveis/responsaveis-repository";

interface ResetPasswordResponsavelRequest {
  email: string;
  token: string;
  password: string;
}

export class ResetPasswordEscolaUserService {
    
    // Recebendo os repositórios no construtor
    constructor(
        private responsaveisRepository: ResponsaveisRepository,
    ) {}

    // Service
    async execute(request: ResetPasswordResponsavelRequest) {

        const { email, token, password } = request;

        // Verificando se o responsavel existe
        const user = await this.responsaveisRepository.findUserWithExistentEmail({email});

        // Se o responsavel não existir, envia um erro
        if (!user) {
            return new Error("Responsável inexistente!");
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
        return await this.responsaveisRepository.updatePassword({id: Object(user).id, password: passwordHash})
    }
}
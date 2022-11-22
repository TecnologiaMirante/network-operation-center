import { randomBytes} from "crypto";
import { MailAdapter } from "../../adapters/mail-adapter";
import { ResponsaveisRepository } from "../../repositories/interfaces/responsaveis/responsaveis-repository";


// Interface
interface ForgotPasswordResponsavelRequest {
    email: string;
}
  
export class ForgotPasswordResponsavelService {

    // Recebendo os repositórios no construtor
    constructor(
        private responsaveisRepository: ResponsaveisRepository,
        private mailAdapter: MailAdapter,
    ) {}

    // Service
    async execute(request:ForgotPasswordResponsavelRequest) {

        // Dados do service
        const { email } = request;

        // Verificando se o responsável existe
        const resp = await this.responsaveisRepository.findUserWithExistentEmail({email});

        // Se o responsável não existir, envia um erro
        if (!resp) {
        return new Error("responsável inexistente!");
        }

        // Gerando token aleatório em hexadecimal
        const token = randomBytes(20).toString('hex');

        // Definindo o tempo de expiração do token
        const now = new Date();
        now.setHours(now.getHours() + 1);

        // Enviando o koen
        await this.responsaveisRepository.sendToken({ id: Object(resp).id, token, expiresIn:now })

        try {
        await this.mailAdapter.sendMail({
            subject: "Novo feedback",
            body: [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111";>`,
            // `<p>Tipo do feedback: ${type}</p>`,
            // `<p>Token: ${comment}</p>`,
            `<p>Você esqueceu sua senha? Não tem problema, utilize esse token: ${token}</p>`,
            `</div>`,
            ].join('\n'),
            email: email
        });
        } catch (err) {
        return new Error("Impossível enviar email de recuperação de senha!");
        }
        
    }
}
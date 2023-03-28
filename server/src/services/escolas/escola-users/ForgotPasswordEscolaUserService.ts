import { randomBytes} from "crypto";
// import { MailAdapter } from "../../../adapters/mail-adapter";
import { EscolaUsersRepository } from "../../../repositories/interfaces/escolas/escolas-users-repository";


// Interface
interface ForgotPasswordEscolaUsersRequest {
    email: string;
}
  
export class ForgotPasswordEscolaUsersService {

    // Recebendo os repositórios no construtor
    constructor(
        private escolaUsersRepository: EscolaUsersRepository,
        // private mailAdapter: MailAdapter,
    ) {}

    // Service
    async execute(request:ForgotPasswordEscolaUsersRequest) {

        // Dados do service
        const { email } = request;

        // Verificando se o usuário existe
        const user = await this.escolaUsersRepository.findUserWithExistentEmail({email});

        // Se o usuário não existir, envia um erro
        if (!user) {
        return new Error("Usuário inexistente!");
        }

        // Gerando token aleatório em hexadecimal
        const token = randomBytes(20).toString('hex');

        // Definindo o tempo de expiração do token
        const now = new Date();
        now.setHours(now.getHours() + 1);

        // Enviando o token
        await this.escolaUsersRepository.sendToken({ id: Object(user).id, token, expiresIn:now })

        // try {
        //     await this.mailAdapter.sendMail({
        //         subject: "Novo feedback",
        //         body: [
        //         `<div style="font-family: sans-serif; font-size: 16px; color: #111";>`,
        //         // `<p>Tipo do feedback: ${type}</p>`,
        //         // `<p>Token: ${comment}</p>`,
        //         `<p>Você esqueceu sua senha? Não tem problema, utilize esse token: ${token}</p>`,
        //         `</div>`,
        //         ].join('\n'),
        //         email: email
        //     });
        // } catch (err) {
        //     return new Error("Impossível enviar email de recuperação de senha!");
        // }
        
    }
}
import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";
const { host, port, user, pass } = require("../../config/mail");

const transport = nodemailer.createTransport({
  host,
  port,
  auth: { user, pass }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail ({ subject, body, email }: SendMailData) {
    await transport.sendMail({
    from: "Equipe Feedget <oi@feedget.com>",
    // to: "<jose.ribeiro@mirante.com.br>",
    to: email,
    subject,
    html: body,
  });
  };
}
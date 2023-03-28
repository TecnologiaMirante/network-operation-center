export interface SendMailData {
    subject: string;
    body: string;
    email: string;
  }
  
  export interface MailAdapter {
    sendMail: (data: SendMailData) => Promise<void>;
  }
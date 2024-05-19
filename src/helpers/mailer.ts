import nodemailer from 'nodemailer';
import ejs from 'ejs';
import config from '../config';

const SESTransport: any = {
  host: config.common.mailSmtp.host,
  port: config.common.mailSmtp.port,
  secure: config.common.mailSmtp.secure,
  auth: {
    user: config.common.mailSmtp.user,
    pass: config.common.mailSmtp.pass
  }
};
const transporter = nodemailer.createTransport(SESTransport);

/* export interface MailOptions {
  to: string;
  subject: string;
  data?: GlobalDataObject;
} */

export interface MailOptions {
  from?: string;
  to: string;
  subject: string;
  html?: string;
  data?: Record<string, any>;
}
interface ResponseBody {
  accepted: string[];
  rejected: string[];
  response: string;
  messageId: string;
}
export const mailer = {
  sendMail: (mail: MailOptions, templateName: string) => {
    return new Promise((resolve, reject) => {
      return ejs.renderFile(
        `${__dirname}/../../public/views/emailTemplates/${templateName}`,
        {
          data: mail.data || '',
        },
        (err, data) => {
          if (err) {
            reject(false);
          } else {
            const mailOptions = {
              from: config.common.mailSmtp.from,
              to: mail.to,
              subject: mail.subject,
              html: data
            };

            return transporter
              .sendMail(mailOptions)
              .then((body: ResponseBody) => {
                resolve(true);
              })
              .catch((error) => {
                console.log('AWS SES Error  : ', error)
                reject(false);
              });
          }
        }
      );
    });
  }
};

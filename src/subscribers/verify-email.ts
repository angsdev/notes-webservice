import config from 'config';
import { SenderMailInformation, MailHandler, services } from '../shared';

const { address }: SenderMailInformation = config.get('mail.from');
const { mailer, templates: { verifyEmailTemplate } } = services.mail;

/**
 * Send a verify email.
 * @param {MailHandler} options
 * @returns {Promise<SMTPTransport.SentMessageInfo>}
 */
export default async (options: MailHandler) => {

  const { version = 'v1', token, to } = options;
  const mail = await mailer.sendMail({
    from: address, to, subject: 'Email verification.',
    html: verifyEmailTemplate({ version, token })
  });
  return mail;
};
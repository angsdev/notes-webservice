import config from 'config';
import { SenderMailInformation, MailHandler, services } from '../shared';

const { address }: SenderMailInformation = config.get('mail.from');
const { mailer, templates: { resetPasswordTemplate } } = services.mail;

/**
 * Send a reset password email.
 * @param {MailHandler} options
 * @returns {Promise<SMTPTransport.SentMessageInfo>}
 */
export default async (options: MailHandler) => {

  const { version = 'v1', token, to } = options;
  const mail = await mailer.sendMail({
    from: address, to, subject: 'Password reset.',
    html: resetPasswordTemplate({ version, token })
  });
  return mail;
};
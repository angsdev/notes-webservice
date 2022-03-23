/*============================ Imports ============================*/
import config from 'config';
import { types as T, services } from '../shared';
/*============================ Vars setup ============================*/
const { address } = config.get('mail.from');
const { mailer, templates: { verifyEmailTemplate: template } } = services.mail;
/*=========================== Rest =============================*/

/**
 * Send a verify email.
 * @param {object} options
 * @returns {Promise<object>}
 */
export default async (options: T.MailTemplate & T.MailHandler) => {

  const { version = 'v1', token, from = address, to } = options;
  const mail = await mailer.sendMail({
    from, to, subject: 'Email verification.',
    html: template({ version, token })
  });
  return mail;
};
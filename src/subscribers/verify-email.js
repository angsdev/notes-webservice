/*============================ Imports ============================*/
const { address } = require('config').get('mail.from');
const { mailer, templates: { verifyEmailTemplate: template } } = require('../shared').services.mail;
/*=========================== Rest =============================*/

/**
 * Send a verify email.
 * @param {object} options
 * @returns {Promise<object>}
 */
module.exports = async (options) => {

  const { version = 'v1', token, from = address, to } = options;
  const mail = await mailer.sendMail({
    from, to, subject: 'Email verification.',
    html: template({ version, token })
  });
  return mail;
};
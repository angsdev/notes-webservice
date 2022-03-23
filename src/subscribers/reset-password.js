/*============================ Imports ============================*/
const { address } = require('config').get('mail.from');
const { mailer, templates: { resetPasswordTemplate: template } } = require('../shared').services.mail;
/*=========================== Rest =============================*/

/**
 * Send a reset password email.
 * @param {object} options
 * @returns {Promise<object>}
 */
module.exports = async (options) => {

  const { version = 'v1', token, from = address, to } = options;
  const mail = await mailer.sendMail({
    from, to, subject: 'Password reset.',
    html: template({ version, token })
  });
  return mail;
};
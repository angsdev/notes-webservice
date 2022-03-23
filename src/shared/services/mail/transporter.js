/*============================ Imports ============================*/
const mailer = require('nodemailer');
const { host, port, username: user, password: pass } = require('config').get('mail.ethereal');
/*============================ Rest ============================*/

module.exports = mailer.createTransport({
  host, port, secure: false,
  auth: { user, pass }
});
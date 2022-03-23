/*============================ Imports ============================*/
import config from 'config';
import mailer from 'nodemailer';
/*============================ Vars setup ============================*/
const { host, port, username: user, password: pass } = config.get('mail.ethereal');
/*============================ Rest ============================*/

export default mailer.createTransport({
  host, port, secure: false,
  auth: { user, pass }
});
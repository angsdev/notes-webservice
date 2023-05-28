import config from 'config';
import mailer from 'nodemailer';
import { ObjectOfAnyValue } from '../../types';

const { host, port, username: user, password: pass }: ObjectOfAnyValue = config.get('mail.ethereal');

export default mailer.createTransport({
  host, port, secure: false,
  auth: { user, pass }
});
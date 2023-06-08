import config from 'config';
import mailer from 'nodemailer';
import SMTPConnection from 'nodemailer/lib/smtp-connection';
import { SecuredServiceConnectionConfig } from '../../';

const { host, port, username: user, password: pass }: SecuredServiceConnectionConfig = config.get('mail.ethereal');

export default mailer.createTransport({
  host, port, secure: false,
  auth: { user, pass },
} as SMTPConnection.Options);
/*============================ Imports ============================*/
import { events } from '../shared';
import verifyEmail from './verify-email';
import resetPassword from './reset-password';
import { EventEmitter } from 'nodemailer/lib/xoauth2';
/*============================ Vars setup ============================*/
const { globalEvents } = events;
/*=========================== Rest =============================*/

/**
 * Load all subscribers.
 * @param {object} emitter
 * @returns {void}
 */
export default (emitter: EventEmitter = globalEvents): void => {

  emitter.on('verifyEmail', verifyEmail);
  emitter.on('resetPassword', resetPassword);
};
import { EventEmitter } from 'events';
import verifyEmail from './verify-email';
import resetPassword from './reset-password';
import { globalEventEmitter } from '../shared';

/**
 * Load all subscribers.
 * @param {EventEmitter} emitter
 * @returns {void}
 */
export default (emitter: EventEmitter = globalEventEmitter): void => {

  emitter.on('verifyEmail', verifyEmail);
  emitter.on('resetPassword', resetPassword);
};
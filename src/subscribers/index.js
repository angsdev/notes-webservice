/*============================ Imports ============================*/
const verifyEmail = require('./verify-email');
const resetPassword = require('./reset-password');
const { globalEvents } = require('../shared').events;
/*=========================== Rest =============================*/

/**
 * Load all subscribers.
 * @param {object} emitter
 * @returns {void}
 */
module.exports = (emitter = globalEvents) => {

  emitter.on('verifyEmail', verifyEmail);
  emitter.on('resetPassword', resetPassword);
};
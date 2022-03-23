/*============================ Imports ============================*/
const { sign, verify } = require('jsonwebtoken');
/*============================ Imports ============================*/

/**
 * Generate a JWT and return it.
 * @param {object} payload
 * @param {object} options
 * @returns {Promise<object>}
 */
exports.generateJWT = (payload, options = { expiresIn: '15d' }) => {
  return new Promise((resolve, reject) => {

    sign(payload, process.env.SECRET_OR_PRIVATE_KEY, options, (err, token) => (err) ? reject(err) : resolve(token));
  });
};

/**
 * Verify if JWT is valid and return a payload.
 * @param {string} token
 * @returns {Promise<object>}
 */
exports.verifyJWT = (token) => {
  return new Promise((resolve, reject) => {

    verify(token, process.env.SECRET_OR_PRIVATE_KEY, (err, payload) => (err) ? reject(err) : resolve(payload));
  });
};
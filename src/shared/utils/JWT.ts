/*============================ Imports ============================*/
import { sign, verify, SignOptions, JwtPayload } from 'jsonwebtoken';
import { ObjectOfAnyValue } from '../types';
/*============================ Rest ============================*/

/**
 * Generate a Json Web Token and return it.
 * @param {ObjectOfAnyValue} payload
 * @param {SignOptions} options
 * @returns {Promise<string>}
 */
export const generateJWT = (payload: ObjectOfAnyValue, options: SignOptions = { expiresIn: '15d' }): Promise<string> => {

  return new Promise((resolve, reject) => {

    sign(
      payload,
      process.env.SECRET_OR_PRIVATE_KEY,
      options,
      (err, token) => (err) ? reject(err) : resolve(token)
    );
  });
};

/**
 * Verify if JWT is valid and return a payload.
 * @param {string} token
 * @returns {Promise<object>}
 */
export const verifyJWT = (token: string): Promise<JwtPayload|string> => {

  return new Promise((resolve, reject) => {

    verify(
      token,
      process.env.SECRET_OR_PRIVATE_KEY,
      (err, payload) => (err) ? reject(err) : resolve(payload)
    );
  });
};
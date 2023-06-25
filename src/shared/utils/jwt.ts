import { JwtPayload, SignOptions, sign, verify } from 'jsonwebtoken';
import { ObjectOfAnyValue } from '..';


export class Jwt {

  /**
   * Generate a Json Web Token and return it.
   * @param {ObjectOfAnyValue} payload
   * @param {SignOptions} options
   * @returns {Promise<string>}
   */
  static generate(payload: ObjectOfAnyValue, options: SignOptions = { expiresIn: '15d' }): Promise<string> {

    const secretKey = process.env.SECRET_OR_PRIVATE_KEY;
    return new Promise((resolve, reject) => {

      sign(payload, secretKey, options, (err, token) => (err) ? reject(err) : resolve(token));
    });
  };

  /**
   * Verify if JWT is valid and return a payload.
   * @param {string} token
   * @returns {Promise<string|JwtPayload>}
   */
  static verify(token: string): Promise<string | JwtPayload> {

    const secretKey = process.env.SECRET_OR_PRIVATE_KEY;
    return new Promise((resolve, reject) => {

      verify(token, secretKey, (err, payload) => (err) ? reject(err) : resolve(payload));
    });
  };
}
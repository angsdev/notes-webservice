/*============================ Imports ============================*/
import { OAuth2Client, TokenPayload } from 'google-auth-library';
/*============================ Rest ============================*/

/**
 * Handle a google authentication and return data.
 * @param {string} idToken
 * @returns {Promise<TokenPayload>}
 */
export const googleAuth = async (idToken: string = ''): Promise<TokenPayload> => {

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  return payload;
};
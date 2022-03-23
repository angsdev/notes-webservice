/*============================ Imports ============================*/
const { OAuth2Client } = require('google-auth-library');
/*============================ Rest ============================*/

/**
 * Handle a google verification and return data.
 * @param {object} idToken
 * @returns {object}
 */
exports.googleVerify = async (idToken = '') => {

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
  const ticket = await client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID });
  const payload = ticket.getPayload();
  return payload;
};

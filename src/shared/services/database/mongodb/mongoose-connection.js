/*============================ Imports ============================*/
const mongoose = require('mongoose');
const { host, port, name } = require('config').get('database.mongodb');
/*============================ Rest ============================*/

mongoose.connect(`${host}:${port}/${name}`);
mongoose.connection.once('connected', () => console.info(`Database connected: ${host}:${port}/${name}`))
  .on('error', (err) => console.error(`Error found ${err}.`))
  .on('disconnected', () => console.info('Database disconnected.'));

module.exports = { mongoose };

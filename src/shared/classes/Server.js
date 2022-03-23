/*============================ Imports ============================*/
const http = require('http');
/*=========================== Rest =============================*/

module.exports = class Server {

  /**
   * Create a new server instance.
   * @param {number} port
   * @param {object} options
   */
  constructor(port = 80, options = {}){

    this.httpServer = new http.Server(options);
    this.port = port;
  }

  /**
   * Start listening the server requests.
   * @param {function} requestListener
   * @returns {this}
   */
  listen(requestListener = undefined){

    this.httpServer.addListener('request', requestListener);
    this.httpServer.listen(this.port, () => console.info('Server initialized.'))
        .on('error', (err) => {

          if(err.syscall !== 'listen') throw err;
          const bind = (typeof this.port === 'string') ? `Pipe ${this.port}` : `Port ${this.port}`;
          /********* handle specific listen errors with friendly messages *********/
          switch(err.code){
            case 'EACCES':
              console.error(`${bind} requires elevated privileges.`);
              break;
            case 'EADDRINUSE':
              console.error(`${bind} is already in use.`);
              break;
            default:
              throw err;
          }
          process.exit(1);
        })
        .on('listening', () => {

          const addr = this.httpServer.address();
          const bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
          console.info(`Listening on ${bind}.`);
        });
    return this;
  }
};
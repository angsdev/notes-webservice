/*============================ Imports ============================*/
import http from 'http';
import { ServerOptions } from './types';
/*=========================== Rest =============================*/

export default class Server {

  protected server: http.Server;
  public port: string|number;

  /**
   * Create a new server instance.
   */
  constructor({ port = 80, options } : ServerOptions){

    this.server = new http.Server(options);
    this.port = port;
  }

  /**
   * Start listening the requests from the source indicated.
   * @param {http.RequestListener} requestListener
   * @returns {this}
   */
  listen(requestListener: http.RequestListener) : this {

    this.server.addListener('request', requestListener);
    this.server.listen(this.port, () => console.info('Server initialized.'))
        .on('error', (err: Error & any) => {

          if(err.syscall !== 'listen') throw err;
          const bind = (typeof this.port === 'string') ? `Pipe: ${this.port}` : `Port: ${this.port}`;

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

          const address = this.server.address();
          const bind = (typeof address === 'string') ? `Pipe: ${address}` : `Port: ${address?.port}`;
          console.info(`Listening on ${bind}.`);
        });
    return this;
  }
}
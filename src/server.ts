#!/usr/bin/env node
/*============================ Imports ============================*/
import 'dotenv/config';
import http from "http";
import app from './app';
import config from 'config';
/*============================ Vars setup ============================*/
const { port = 80 } : any = config.get('server');
/*=========================== Rest =============================*/

const Server = new http.Server(app);
Server.listen(port , () => console.info('Server initialized.'))
      .on('error', (err: Error & any) => {

        if(err.syscall !== 'listen') throw err;
        const bind = (typeof port === 'string') ? `Pipe: ${port}` : `Port: ${port}`;

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

        const address = Server.address();
        const bind = (typeof address === 'string') ? `Pipe: ${address}` : `Port: ${address?.port}`;
        console.info(`Listening on ${bind}.`);
      });
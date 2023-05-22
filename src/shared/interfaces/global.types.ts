/*============================ Imports ============================*/
import http from "http";
/*=========================== Rest =============================*/

export interface MultiListenerServerOptions {
  port: string|number;
  options?: http.ServerOptions
}

export interface BaseErrorOptions {
  name: string;
  message: string;
  status: number;
  isOperational?: boolean;
}
/*============================ Imports ============================*/
import http from "http";



/**** OLD ****/
import { PopulateOptions, QueryOptions } from 'mongoose';
/**** OLD ****/

/*=========================== Rest =============================*/

export interface ServerOptions {
  port: string|number;
  options?: http.ServerOptions;
}

export interface BaseErrorOptions {
  name: string;
  message: string;
  status: number;
  isOperational?: boolean;
}

export interface FormattedLog {
  datetime: Date|string;
  log: string;
  stackTrace: string;
}

export interface ConsoleMessageFormat {
  info: string;
  debug: string;
  warn: string;
  error: string;
}

export interface ObjectOfAnyValue {
  [key: string]: any;
}

export interface MailMetaData {
  version: string;
  token: string;
}

export interface PasswordValidationStandard {
  minLength: number;
  minNumbers: number;
  minSymbols: number;
  minUppercase: number;
  minLowercase: number;
}

export interface ValidationStardard {
  password: PasswordValidationStandard;
}

export interface ServiceConnectionConfig {
  host: string;
  port: string|number;
}


export interface SecuredServiceConnectionConfig extends ServiceConnectionConfig {
  username?: string;
  password?: string;
}

export interface DatabaseEnvironmentConfig extends ServiceConnectionConfig {
  name: string;
}

export interface MailerEnvironmentConfig {
  from: {
    address: string;
    name: string;
  },
  services: {
    ethereal: ServiceConnectionConfig;
  }
}

export interface AppEnvironmentConfig {
  name: string;
  validationStandards: ValidationStardard;
}

export interface ServerEnvironmentConfig extends ServiceConnectionConfig {
  secretKey: string;
}

export interface EnvirontmentConfig {
  app?: AppEnvironmentConfig;
  server?: ServerEnvironmentConfig;
  database?: {
    mongodb?: DatabaseEnvironmentConfig;
    mysql?: DatabaseEnvironmentConfig;
  };
  mail?: MailerEnvironmentConfig;
  logger?: {
    morgan?: {
      format: string;
    }
  }
}












/**** OLD ****/


export default interface IRepository {

  /**
   * Get all documents and it total.
   * @param {object} options
   * @returns {Promise<{ total: number; data: object[]; }>}
   */
  getAll(options: object): Promise<{ total: number; data: object; }>;

  /**
   * Get one document.
   * @param {object} where
   * @param {object} options
   * @returns {Promise<object>}
   */
  getBy(where: object, options: object): Promise<object>;

  /**
   * Create one or more documents.
   * @param {object} data
   * @returns {Promise<object|object[]>}
   */
  create(data: object): Promise<object>;

  /**
   * Update one or more documents.
   * @param {object} where
   * @param {object} toUpdate
   * @param {object} options
   * @returns {Promise<object|object[]>}
   */
  update(where: object, toUpdate: object, options: object): Promise<object>;

  /**
   * Delete one or more documents.
   * @param {object} where
   * @param {object} options
   * @returns {Promise<object|object[]>}
   */
  delete(where: object, options: object): Promise<object>;
}


export type ResourcesCollectionOptions = {
  page?: number;
  per_page?: number;
  where?: ModelIdentifiers;
  sort_by?: any[]|string;
  order?: string;
  populate?: string|string[]|object[];
  filter?: object;
}

export type SingleResourceOptions = {
  filter?: string|object;
  populate?: string|string[]|PopulateOptions|PopulateOptions[];
  many?: boolean;
  new?: boolean;
  timestamps?: boolean;
};

export type ModelIdentifiers = {
  [x: string]: string|object;
}

export type Credentials = {
  username: string;
  password: string;
}

export type MailHandler = {
  from?: string;
  to: string;
}


/**** OLD ****/

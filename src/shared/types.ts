import http from "http";
import { Request as ExpressRequest } from 'express';

/**** OLD ****/
import { PopulateOptions, QueryOptions, Document } from 'mongoose';
/**** OLD ****/

/* General */

export type ObjectOfAnyValue = { [key: string]: any };

export type TargetToSelect = ObjectOfAnyValue;

export type ObjectOfStringValues = { [key: string]: string; };

/* Base Options */

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

export interface PasswordValidationStandard {
  minLength?: number;
  minNumbers?: number;
  minSymbols?: number;
  minUppercase?: number;
  minLowercase?: number;
}

export interface ValidationStandard {
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

export interface DatabaseEnvironmentConfig extends SecuredServiceConnectionConfig {
  name: string;
}

export interface MailMetaData {
  version: string;
  token: string;
}

export interface SenderMailInformation {
  address: string;
  name: string;
  to?: string;
}

export interface MailerServices {
  ethereal: ServiceConnectionConfig;
}

export interface MailHandler extends MailMetaData, SenderMailInformation {
  from?: string;
}

export interface MailerEnvironmentConfig {
  from: SenderMailInformation;
  services: MailerServices;
}

export interface AppEnvironmentConfig {
  name: string;
  validationStandards: ValidationStandard;
}

export interface ServerEnvironmentConfig extends ServiceConnectionConfig {
  secretKey: string;
}

export interface EnvironmentConfig {
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


/* Involving third-parties libraries */


export interface UserInfo {
  id?: string;
  authenticated: boolean;
}

export interface AuthRequest extends ExpressRequest {
  user?: UserInfo
}

export interface CollectionRequestParams {
  page?: number;
  perPage?: number;
  sortBy?: string;
  order?: 'desc'|'asc';
  where?: { [param: string]: any };
}

export interface CollectionOptions extends CollectionRequestParams, IsFilterable, IsPopulable { }


// export interface ResourcesCollectionOptions extends CollectionRequestParams, IsFilterable, IsPopulable {
// }

export interface CustomQueryOptions extends QueryOptions, IsFilterable { }


export interface IsFilterable {
  filter?: string[];
}

export interface IsPopulable {
  populate?: string|string[]|PopulateOptions | PopulateOptions[];
}

export interface CanManageMany {
  many?: boolean;
}
export type ManageMany = CanManageMany;

// export interface Postable {}






/**** OLD ****/










// export interface SingleResourceOptions extends IsPopulable, IsFilterable { };

export interface SingleUpdateResourceOptions extends IsPopulable {
  many?: boolean;
  new?: boolean;
  timestamps?: boolean;
}

// export interface SingleResourceOptions extends IsPopulable, IsFilterable {

// }

export interface HasMongoIdFormat {
  _id: unknown;
}

export interface CollectionResult<T, IdType = unknown> {
  total: number;
  collection: (T & IdType)[];
}

export interface Entity {}

export interface FormattedCollectionResult extends CollectionResult<Entity> {
  page: number;
  pages: number;
 }

// export interface SingleSubResourceIdentifiers {
//   [subName: string]: string;
// }

// export type ModelIdentifiers = {
//   [x: string]: string|object;
// }



// export type Credentials = {
//   username: string;
//   password: string;
// }

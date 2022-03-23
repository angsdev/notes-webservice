import { PopulateOptions, QueryOptions } from 'mongoose';

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

export type MailTemplate = {
  version: string;
  token: string;
  [x: string]: any;
}
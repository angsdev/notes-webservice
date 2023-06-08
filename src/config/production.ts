import { EnvironmentConfig } from '../shared';

export = {
  app: {
    name: process.env.APP_NAME,
    validationStandards: {
      password: {
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
        minUppercase: 1,
        minLowercase: 1
      }
    }
  },
  server: {
    host: process.env.SERVER_HOST,
    port: process.env.SERVER_PORT,
    secretKey: process.env.SECRET_OR_PRIVATE_KEY
  },
  database: {
    mongodb: {
      host: `mongodb://${process.env.DB_MONGODB_HOST}`,
      port: process.env.DB_MONGODB_PORT,
      name: process.env.DB_MONGODB_NAME,
      username: process.env.DB_MONGODB_USERNAME,
      password: process.env.DB_MONGODB_PASSWORD
    },
    mysql: {
      host: `mysql://${process.env.DB_MYSQL_HOST}`,
      port: process.env.DB_MYSQL_PORT,
      name: process.env.DB_MYSQL_NAME,
      username: process.env.DB_MYSQL_USERNAME,
      password: process.env.DB_MYSQL_PASSWORD
    }
  },
  mail: {
    from: {
      address: process.env.MAIL_FROM_ADDRESS,
      name: process.env.MAIL_FROM_NAME
    },
    services: {
      ethereal: {
        host: process.env.MAIL_ETHEREAL_HOST,
        port: process.env.MAIL_ETHEREAL_PORT,
        username: process.env.MAIL_ETHEREAL_USERNAME,
        password: process.env.MAIL_ETHEREAL_PASSWORD
      }
    }
  },
  logger: {
    morgan: {
      format: 'Status: :status - Method: :method - Endpoint: :url - :res[content-length] - :response-time ms'
    }
  }
} as EnvironmentConfig;
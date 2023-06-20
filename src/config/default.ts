import { EnvironmentConfig } from '../shared';

export = {
  app: {
    name: (process.env.APP_NAME || 'node-example'),
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
    host: (process.env.SERVER_HOST || 'http://localhost'),
    port: (process.env.SERVER_PORT || 8000),
    secretKey: process.env.SECRET_OR_PRIVATE_KEY
  },
  database: {
    mongodb: {
      host: `mongodb://${(process.env.DB_MONGODB_HOST || 'localhost')}`,
      port: (process.env.DB_MONGODB_PORT || 27017),
      name: (process.env.DB_MONGODB_NAME || 'example'),
      username: process.env.DB_MONGODB_USERNAME,
      password: process.env.DB_MONGODB_PASSWORD
    },
    mysql: {
      host: `mysql://${process.env.DB_MYSQL_HOST || 'localhost'}`,
      port: (process.env.DB_MYSQL_PORT || 3306),
      name: (process.env.DB_MYSQL_NAME || 'example'),
      username: process.env.DB_MYSQL_USERNAME,
      password: process.env.DB_MYSQL_PASSWORD
    }
  },
  cache: {
    redis: {
      host: `redis://${(process.env.CACHE_REDIS_HOST || 'localhost')}`,
      port: (process.env.CACHE_REDIS_PORT || 6379),
      name: (process.env.CACHE_REDIS_NAME || 'example'),
      username: process.env.CACHE_REDIS_USERNAME,
      password: process.env.CACHE_REDIS_PASSWORD
    },
    memcached: {
      host: `memcached://${(process.env.CACHE_MEMCACHED_HOST || 'localhost')}`,
      port: (process.env.CACHE_MEMCACHED_PORT || 11211),
      name: (process.env.CACHE_MEMCACHED_NAME || 'example'),
      username: process.env.CACHE_MEMCACHED_USERNAME,
      password: process.env.CACHE_MEMCACHED_PASSWORD
    }
  },
  mail: {
    from: {
      address: process.env.MAIL_FROM_ADDRESS,
      name: process.env.MAIL_FROM_NAME
    },
    services: {
      ethereal: {
        host: (process.env.MAIL_ETHEREAL_HOST || 'smtp.ethereal.email'),
        port: (process.env.MAIL_ETHEREAL_PORT || 587),
        username: process.env.MAIL_ETHEREAL_USERNAME,
        password: process.env.MAIL_ETHEREAL_PASSWORD
      }
    }
  },
  logger: {
    morgan: {
      format: 'Status: :status - Method: :method - Endpoint: :url - :res[content-length] - :response-time ms'
      // format: 'Client: :remote-addr - User: :remote-user - Date: [:date[clf]] - Method: :method - Endpoint: :url - HTTP/:http-version - Status: :status - Response Time :response-time ms'
    }
  }
} as EnvironmentConfig;
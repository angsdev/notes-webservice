import compression from 'compression';
import config from 'config';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import { middlewares } from './shared';
import initSubscribers from './subscribers';

const { notFoundFallback, errorHandlerFallback } = middlewares.fallback;

const app = express();
app.use(compression())
   .use(cookieParser())
   .use(cors())
   .use(express.json())
   .use(express.urlencoded({ extended: false }))
   .use(helmet())
   .use(morgan(config.get('logger.morgan.format')))
   .use('/', routes)
   .use(notFoundFallback)
   .use(errorHandlerFallback);

initSubscribers();

export default app;
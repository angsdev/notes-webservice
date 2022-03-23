/*============================ Imports ============================*/
import cors from 'cors';
import config from 'config';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import routes from './routes';
import compression from 'compression';
import { middlewares } from './shared';
import cookieParser from 'cookie-parser';
import initSubscribers from './subscribers';
/*============================ Vars setup ============================*/
const { notFoundThrower, fallback } = middlewares.errors;
/*=========================== Rest =============================*/

const app = express();
app.use(compression())
   .use(cookieParser())
   .use(cors())
   .use(express.json())
   .use(express.urlencoded({ extended: false }))
   .use(helmet())
   .use(morgan(config.get('logger.morgan.format')))
   .use('/', routes)
   .use(notFoundThrower)
   .use(fallback);

initSubscribers();

export default app;
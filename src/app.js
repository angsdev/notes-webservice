/*============================ Imports ============================*/
const cors = require('cors');
const config = require('config');
const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');
/*============================ Imports ============================*/
const routes = require('./routes');
const initSubscribers = require('./subscribers');
const { notFoundThrower, fallback } = require('./shared').middlewares.errors;
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

module.exports = app;
#!/usr/bin/env node
/*============================ Imports ============================*/
import 'dotenv/config';
import app from './app';
import config from 'config';
import { classes } from './shared';
/*============================ Vars setup ============================*/
const { Server } = classes;
const { port } = config.get('server');
/*=========================== Rest =============================*/

new Server(port).listen(app);
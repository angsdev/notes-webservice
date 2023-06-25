import config from 'config';
import mongoose from 'mongoose';
import { DatabaseEnvironmentConfig } from '../../../';

const { host, port, name }: DatabaseEnvironmentConfig = config.get('database.mongodb');
const mongoServer = `${host}:${port}/${name}`;

mongoose.connect(mongoServer);
mongoose.connection
        .once('connected', () => console.info(`Database connected: ${mongoServer}`))
        .on('error', (error) => console.error(`Error found: ${error}`))
        .on('disconnected', () => console.info('Database disconnected.'));

export { mongoose };

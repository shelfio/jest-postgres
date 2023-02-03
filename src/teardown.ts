import cwd from 'cwd';
import {stop} from '@shelf/postgres-local';

const config = require(`${cwd()}/jest-postgres-config.js`);

module.exports = async function stopPostgres() {
  await stop(config);
};

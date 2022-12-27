import {stop} from '@shelf/postgres-local';
import cwd from 'cwd';

const config = require(`${cwd()}/jest-postgres-config.js`);

module.exports = async function stopPostgres() {
  await stop(config);
};

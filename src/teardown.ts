import {stop} from '@shelf/postgres-local';
import cwd from 'cwd';

module.exports = async function stopPostgres() {
  const config = require(`${cwd()}/jest-postgres-config.js`);
  await stop(config?.version);
};

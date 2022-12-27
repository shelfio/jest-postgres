import {stop} from '@shelf/postgres-local';
import cwd from 'cwd';

module.exports = function stopPostgres() {
  const config = require(`${cwd()}/jest-postgres-config.js`);

  return stop(config);
};

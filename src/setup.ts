import cwd from 'cwd';
import {start} from '@shelf/postgres-local';

const config = require(`${cwd()}/jest-postgres-config.js`);

module.exports = async function startPostgres() {
  await start(config);

  return true;
};

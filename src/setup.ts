import {start} from '@shelf/postgres-local';
import cwd from 'cwd';

const config = require(`${cwd()}/jest-postgres-config.js`);

module.exports = async function startPostgres() {
  await start(config);

  return true;
};

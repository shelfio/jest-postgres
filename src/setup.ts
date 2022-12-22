import {start} from '@shelf/postgres-local';
import cwd from 'cwd';

module.exports = async function startPostgres() {
  const config = require(`${cwd()}/jest-postgres-config.js`);
  await start(config);

  return true;
};

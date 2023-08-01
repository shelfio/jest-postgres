import {start} from '@shelf/postgres-local';
import {getConfig} from './config';

module.exports = async function startPostgres() {
  const config = getConfig();

  await start(config);

  return true;
};

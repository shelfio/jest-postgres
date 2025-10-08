import {stop} from '@shelf/postgres-local';
import {getConfig} from './config';

module.exports = async function stopPostgres() {
  const config = await getConfig();

  await stop(config);
};

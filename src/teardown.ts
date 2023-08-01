import {stop} from '@shelf/postgres-local';
import {getConfig} from './config';

module.exports = function stopPostgres() {
  const config = getConfig();

  stop(config);
};

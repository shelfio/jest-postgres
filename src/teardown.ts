import {stop} from '@shelf/postgres-local';

module.exports = async function stopPostgres() {
  await stop();
};

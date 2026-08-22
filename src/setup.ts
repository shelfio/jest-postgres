import {getConfig} from './config';
import {startPostgres as startPostgresRuntime} from './postgres';

module.exports = async function setupPostgres() {
  const config = await getConfig();

  await startPostgresRuntime(config);

  return true;
};

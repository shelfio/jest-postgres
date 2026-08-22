import {getConfig} from './config';
import {stopPostgres as stopPostgresRuntime} from './postgres';

module.exports = async function teardownPostgres() {
  const config = await getConfig();

  stopPostgresRuntime(config);
};

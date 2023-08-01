import {resolve} from 'path';
import cwd from 'cwd';

const DEFAULT_CONFIG_FILE_NAME = 'jest-postgres-config.js';

export function getConfig() {
  const path = process.env.JEST_POSTGRES_CONFIG || resolve(cwd(), DEFAULT_CONFIG_FILE_NAME);
  const config = require(path);

  return config;
}

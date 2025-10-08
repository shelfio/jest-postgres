import {existsSync} from 'fs';
import {resolve} from 'path';
import {pathToFileURL} from 'url';
import cwd from 'cwd';

const DEFAULT_CONFIG_FILE_NAMES = ['jest-postgres-config.cjs', 'jest-postgres-config.js'];
const dynamicImport = new Function('specifier', 'return import(specifier);') as (
  specifier: string
) => Promise<unknown>;

export async function getConfig() {
  const projectRoot = cwd();
  const configPath = process.env.JEST_POSTGRES_CONFIG ?? findConfigPath(projectRoot);

  return await loadConfig(configPath);
}

function findConfigPath(projectRoot: string) {
  for (const fileName of DEFAULT_CONFIG_FILE_NAMES) {
    const candidate = resolve(projectRoot, fileName);

    if (existsSync(candidate)) {
      return candidate;
    }
  }

  return resolve(projectRoot, DEFAULT_CONFIG_FILE_NAMES[0]);
}

async function loadConfig(path: string) {
  try {
    const config = require(path);

    return config.default ?? config;
  } catch (error) {
    const err = error as NodeJS.ErrnoException;

    if (err?.code === 'ERR_REQUIRE_ESM') {
      const module = await dynamicImport(pathToFileURL(path).href);

      return (module as {default?: unknown}).default ?? module;
    }

    throw error;
  }
}

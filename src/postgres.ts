import {execFileSync} from 'child_process';
import {mkdirSync, rmSync} from 'fs';
import {platform, userInfo} from 'os';
import getDebug from 'debug';
import postgres from 'postgres';
import type {ExecFileSyncOptions} from 'child_process';

const debug = getDebug('jest-postgres');
const POSTGRES_TEMP_PATH = '/tmp/jest-postgres';
const POSTGRES_DATA_PATH = `${POSTGRES_TEMP_PATH}/data`;
const POSTGRES_LOG_PATH = `${POSTGRES_TEMP_PATH}/logfile`;

type PostgresOptions = {
  seedPath?: string;
  version?: number;
  port?: number;
  includeInstallation?: boolean;
  debugMode?: boolean;
};

// eslint-disable-next-line complexity
export async function startPostgres(options: PostgresOptions): Promise<string> {
  const {
    seedPath,
    version = 17,
    port = 5555,
    includeInstallation = false,
    debugMode = false,
  } = options;
  const url = `postgres://localhost:${port}/postgres`;

  try {
    startPostgresProcess({version, port, includeInstallation, debugMode});

    debug('Connecting to Postgres');
    process.env.PSQL = url;

    if (seedPath?.length) {
      debug('Seeding Postgres');
      const sql = postgres(url);

      try {
        await sql.file(seedPath);
      } finally {
        await sql.end();
      }

      debug('Postgres seed complete');
    }

    return url;
  } catch (error) {
    try {
      stopPostgres({version, debugMode});
    } catch (cleanupError) {
      debug('Could not clean up Postgres after startup failed', cleanupError);
    }

    throw error;
  }
}

export function stopPostgres({version = 17, debugMode = false}: PostgresOptions): void {
  switch (platform()) {
    case 'darwin': {
      try {
        run(getPostgresBinPath(version, 'pg_ctl'), ['stop', '-D', POSTGRES_DATA_PATH], debugMode);
      } finally {
        rmSync(POSTGRES_TEMP_PATH, {recursive: true, force: true});
      }

      return;
    }
    case 'linux': {
      try {
        run(
          'sudo',
          [
            '-u',
            'postgres',
            `/usr/lib/postgresql/${version}/bin/pg_ctl`,
            'stop',
            '-D',
            POSTGRES_DATA_PATH,
          ],
          debugMode
        );
      } finally {
        run('sudo', ['-u', 'postgres', 'rm', '-rf', POSTGRES_TEMP_PATH], debugMode);
      }

      return;
    }
    default: {
      throw new Error('Unsupported OS, use macOS or Linux');
    }
  }
}

function startPostgresProcess({
  version,
  port,
  includeInstallation,
  debugMode,
}: Required<
  Pick<PostgresOptions, 'version' | 'port' | 'includeInstallation' | 'debugMode'>
>): void {
  switch (platform()) {
    case 'darwin': {
      startPostgresOnMacOS({version, port, includeInstallation, debugMode});

      return;
    }
    case 'linux': {
      startPostgresOnLinux({version, port, includeInstallation, debugMode});

      return;
    }
    default: {
      throw new Error('Unsupported OS, use macOS or Linux');
    }
  }
}

function startPostgresOnMacOS({
  version,
  port,
  includeInstallation,
  debugMode,
}: Required<
  Pick<PostgresOptions, 'version' | 'port' | 'includeInstallation' | 'debugMode'>
>): void {
  if (includeInstallation) {
    run('brew', ['install', `postgresql@${version}`], debugMode);
  }

  mkdirSync(POSTGRES_DATA_PATH, {recursive: true});
  run(getPostgresBinPath(version, 'initdb'), ['-D', POSTGRES_DATA_PATH], debugMode);
  run(
    getPostgresBinPath(version, 'pg_ctl'),
    ['-D', POSTGRES_DATA_PATH, '-o', `-F -p ${port}`, '-l', POSTGRES_LOG_PATH, 'start'],
    debugMode
  );
}

function startPostgresOnLinux({
  version,
  port,
  includeInstallation,
  debugMode,
}: Required<
  Pick<PostgresOptions, 'version' | 'port' | 'includeInstallation' | 'debugMode'>
>): void {
  if (includeInstallation) {
    run('sudo', ['apt', 'update'], debugMode);
    run('sudo', ['apt', 'install', `postgresql-${version}`], debugMode);
  }

  const postgresBinPath = `/usr/lib/postgresql/${version}/bin`;
  const currentUser = userInfo().username;

  run('sudo', ['-u', 'postgres', 'mkdir', '-p', POSTGRES_DATA_PATH], debugMode);
  run('sudo', ['-u', 'postgres', `${postgresBinPath}/initdb`, '-D', POSTGRES_DATA_PATH], debugMode);
  run(
    'sudo',
    [
      '-u',
      'postgres',
      `${postgresBinPath}/pg_ctl`,
      '-o',
      `-F -p ${port}`,
      '-D',
      POSTGRES_DATA_PATH,
      '-l',
      POSTGRES_LOG_PATH,
      'start',
    ],
    debugMode
  );
  run('sudo', ['-u', 'postgres', 'createuser', '-p', String(port), '-s', currentUser], debugMode);
  run('sudo', ['-u', 'postgres', 'createdb', '-p', String(port), currentUser], debugMode);
}

function getPostgresBinPath(version: number, binary: 'initdb' | 'pg_ctl'): string {
  try {
    const brewPrefix = execFileSync('brew', ['--prefix'], {encoding: 'utf8'}).trim();

    return `${brewPrefix}/opt/postgresql@${version}/bin/${binary}`;
  } catch (error) {
    console.error(error);
    throw new Error(
      'Homebrew is not installed or not found in PATH. Install Homebrew to use this package on macOS.'
    );
  }
}

function run(command: string, args: string[], debugMode: boolean): void {
  const options: ExecFileSyncOptions = debugMode ? {stdio: 'inherit'} : {};

  execFileSync(command, args, options);
}

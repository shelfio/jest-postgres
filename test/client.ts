import knex from 'knex';
import type {Knex} from 'knex';

let client: Knex<string, any>;
let connected = false;

export function getClient(params: {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}): Knex<string, any> {
  if (client && connected) {
    return client;
  }

  client = knex({
    client: 'pg',
    connection: {
      host: params.host,
      port: params.port,
      user: params.username,
      password: params.password,
      database: params.database,
    },
    pool: {
      min: 2,
    },
  });
  connected = true;

  return client;
}

export const closeConnection = async () => {
  connected = false;
  await client.destroy();
};

import {closeConnection, getClient} from './client';

describe('#getClient', () => {
  const client = getClient({
    host: 'localhost',
    port: 5555,
    username: '',
    password: '',
    database: 'postgres',
  });

  it('should use 5555 port and insert records', async () => {
    await client.withSchema('test').table('model1').insert({
      id: 'unique',
      type: 'some text',
      text: 'should be text',
    });

    const res = await client.withSchema('test').table('model1').select('*').where({id: 'unique'});

    expect(res).toEqual([
      {
        id: 'unique',
        json: null,
        somebool: null,
        text: 'should be text',
        type: 'some text',
        updated_at: null,
        vector: null,
      },
    ]);

    await closeConnection();
  });
});

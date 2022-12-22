import {getClient} from './client';

describe('#getClient', () => {
  const client = getClient({
    host: 'localhost',
    port: 5432,
    username: '',
    password: '',
    database: 'postgres',
  });

  it('should insert records', async () => {
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
  });
});

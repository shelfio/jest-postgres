# jest-postgres [![CircleCI](https://circleci.com/gh/shelfio/jest-postgres/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/jest-postgres/tree/master) ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg) [![npm (scoped)](https://img.shields.io/npm/v/@shelf/jest-postgres.svg)](https://www.npmjs.com/package/@shelf/jest-postgres)

> Jest preset to run Postgres server

[Test Postgres using only this jest plugin (no DB mocks/Docker)!](https://medium.com/shelf-io-engineering/test-postgres-using-jest-755389b28d22)

## Usage

### 0. Install

```
$ yarn add @shelf/jest-postgres --dev
```

### 1. Create `jest.config.js`

```js
module.exports = {
  preset: '@shelf/jest-postgres',
};
```

If you have a custom `jest.config.js` make sure you remove `testEnvironment` property, otherwise it will conflict with the preset.

### 2. Create `jest-postgres-config.js`

```js
import cwd from 'cwd';

module.exports = {
  seedPath: `${cwd()}/test/seed.sql`,
  version: 14,
  port: 5555,
};
```

Find `seed.sql` example in `./test` folder of this repo, view [postgres-local](https://github.com/shelfio/postgres-local#1-start-postgres) for more params.

### 4. PROFIT! Write tests

```js
it();
```

## Monorepo Support

By default the `jest-postgres-config.js` is read from `cwd` directory, but this might not be
suitable for monorepos with nested [jest projects](https://jestjs.io/docs/configuration#projects-arraystring--projectconfig)
with nested `jest.config.*` files nested in subdirectories.

If your `jest-postgres-config.js` file is not located at `{cwd}/jest-postgres-config.js` or you
are using nested `jest projects`, you can define the environment variable `JEST_POSTGRES_CONFIG`
with the absolute path of the respective `jest-postgres-config.js` file.

### Example Using `JEST_POSTGRES_CONFIG` in nested project

```js
// src/nested/project/jest.config.js
const path = require('path');

// Define path of project level config - extension not required as file will be imported
// via `require(process.env.JEST_POSTGRES_CONFIG)`
process.env.JEST_POSTGRES_CONFIG = path.resolve(__dirname, './jest-postgres-config');

module.exports = {
  preset: '@shelf/jest-postgres'
  displayName: 'nested-project',
};
```

## See Also

- [postgres-local](https://github.com/shelfio/postgres-local)
- [jest-elasticsearch](https://github.com/shelfio/jest-elasticsearch)
- [jest-dynamodb](https://github.com/shelfio/jest-dynamodb)

## Publish

```sh
$ git checkout master
$ yarn version
$ yarn publish
$ git push origin master --tags
```

## License

MIT © [Shelf](https://shelf.io)

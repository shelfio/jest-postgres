# jest-postgres [![CircleCI](https://circleci.com/gh/shelfio/jest-postgres/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/jest-postgres/tree/master) [![npm (scoped)](https://img.shields.io/npm/v/@shelf/jest-postgres.svg)](https://www.npmjs.com/package/@shelf/jest-postgres)

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

### 2. Create `jest-postgres-config.cjs`

```js
const cwd = require('cwd');

module.exports = {
  seedPath: `${cwd()}/test/seed.sql`,
  version: 14,
  port: 5555,
};
```

Find `seed.sql` example in `./test` folder of this repo, view [postgres-local](https://github.com/shelfio/postgres-local#1-start-postgres) for more params.

> When your project itself uses CommonJS, you can keep using a `jest-postgres-config.js` file.
> Starting with v1.2.3+, the preset prefers `jest-postgres-config.cjs` but will still fall back to the `.js`
> variant for backward compatibility.

### 4. PROFIT! Write tests

```js
it();
```

## Monorepo Support

By default the `jest-postgres-config.cjs` (falling back to `.js`) is read from `cwd` directory, but this might not be
suitable for monorepos with nested [jest projects](https://jestjs.io/docs/configuration#projects-arraystring--projectconfig)
with nested `jest.config.*` files nested in subdirectories.

If your Jest Postgres config file is not located at `{cwd}/jest-postgres-config.cjs` (or `.js`) or you
are using nested `jest projects`, you can define the environment variable `JEST_POSTGRES_CONFIG`
with the absolute path of the respective configuration file.

### Example Using `JEST_POSTGRES_CONFIG` in nested project

```js
// src/nested/project/jest.config.js
const path = require('path');

// Define path of project level config - extension is optional as the loader checks for
// both `.cjs` and `.js` automatically.
process.env.JEST_POSTGRES_CONFIG = path.resolve(__dirname, './jest-postgres-config');

module.exports = {
  preset: '@shelf/jest-postgres',
  displayName: 'nested-project',
};
```

## Module Format Compatibility

Starting with v1.2.3 the package declares `"type": "module"` so Node can load our sources with native ESM tooling.  
To remain backward compatible we now ship prebuilt `.cjs` entry points for the preset and helpers while keeping the
original TypeScript source. CommonJS consumers can continue using `require('@shelf/jest-postgres')`, and ESM projects
can `import preset from '@shelf/jest-postgres'` or `import preset from '@shelf/jest-postgres/jest-preset'`.

The runtime config loader also prefers `jest-postgres-config.cjs` but automatically falls back to
`jest-postgres-config.js`. If your config exports an ES module (for example, you use `export default {...}`) it will
still be picked up because the loader falls back to a dynamic `import()` when a CommonJS `require` is not supported.

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

# jest-postgres [![CircleCI](https://circleci.com/gh/shelfio/jest-postgres/tree/master.svg?style=svg)](https://circleci.com/gh/shelfio/jest-postgres/tree/master) ![](https://img.shields.io/badge/code_style-prettier-ff69b4.svg) [![npm (scoped)](https://img.shields.io/npm/v/@shelf/jest-postgres.svg)](https://www.npmjs.com/package/@shelf/jest-postgres)

> Jest preset to run Postgres server

## Usage

### 0. Install

```
$ yarn add @shelf/jest-postgres --dev
```

### 1. Create `jest.config.js`

```js
module.exports = {
  preset: '@shelf/jest-postgres'
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
Find `seed.sql` example in `./test` folder of this repo
### 4. PROFIT! Write tests

```js
it();
```

## See Also

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

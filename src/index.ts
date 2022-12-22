import {resolve} from 'path';

module.exports = {
  globalSetup: resolve(__dirname, './setup.js'),
  globalTeardown: resolve(__dirname, './teardown.js'),
};

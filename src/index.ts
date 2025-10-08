import {resolve} from 'path';

const preset = {
  globalSetup: resolve(__dirname, './setup.cjs'),
  globalTeardown: resolve(__dirname, './teardown.cjs'),
};

module.exports = preset;
module.exports.default = preset;
